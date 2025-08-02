const axios = require('axios');

const useOpenRouter = process.env.OPENROUTER === 'true';
const API_KEY = useOpenRouter ? process.env.OPENROUTER_API_KEY : process.env.OPENAI_API_KEY;

const analyzeResumeWithAI = async (resumeText) => {
  try {
    const prompt = `
You are a professional technical recruiter. Analyze this resume and return:
- Key strengths
- Weak areas
- Missing keywords
- Overall tone

Resume:
${resumeText}
`;

    const response = await axios.post(
      useOpenRouter
        ? 'https://openrouter.ai/api/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions',
      {
        model: useOpenRouter ? 'deepseek/deepseek-r1-0528:free' : 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert AI resume reviewer.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + API_KEY,
          ...(useOpenRouter && { 'HTTP-Referer': 'https://yourdomain.com', 'X-Title': 'CV Genius' }),
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error('OpenAI error:', err.response?.data || err.message);
    return 'Could not analyze resume at this time.';
  }
};

module.exports = { analyzeResumeWithAI };