const pdfParse = require('pdf-parse');
const Feedback = require('../models/Feedback');
const { analyzeResumeWithAI } = require('../services/openai');
const { sendPrioritySMS } = require('../services/twilio');
const { createStripeSession } = require('../services/stripe');

exports.handleResumeUpload = async (req, res) => {
  try {
    const { name, email, priority } = req.body;

    if (!req.file) return res.status(400).json({ error: 'Resume PDF is required' });

    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;

    const feedback = new Feedback({
      name,
      email,
      priority: priority === 'true',
      resumeText,
      status: 'processing'
    });
    await feedback.save();

    if (priority === 'true') {
      const session = await createStripeSession(email);
      return res.json({ message: 'Redirect to Stripe', stripeUrl: session.url });
    }

    const aiFeedback = await analyzeResumeWithAI(resumeText);
    feedback.feedback = aiFeedback;
    feedback.status = 'done';
    await feedback.save();

    await sendPrioritySMS(name, email);

    res.json({ message: 'Resume analyzed successfully', summary: aiFeedback });
  } catch (err) {
    console.error('Resume upload error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getReviewStatus = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await Feedback.findOne({ email });
    if (!result) return res.status(404).json({ error: 'No feedback found' });

    res.json({ status: result.status, feedback: result.feedback || null });
  } catch (err) {
    console.error('Status check error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};