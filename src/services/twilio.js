const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNumber = process.env.TWILIO_PHONE_NUMBER;
const adminNumber = process.env.ADMIN_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendPrioritySMS = async (name, email) => {
  try {
    const message = await client.messages.create({
      body: `New resume received from ${name} (${email}).`,
      from: senderNumber,
      to: adminNumber
    });
    console.log('SMS sent:', message.sid);
  } catch (err) {
    console.error('Twilio SMS error:', err.message);
  }
};

module.exports = { sendPrioritySMS };