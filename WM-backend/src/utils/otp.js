const crypto = require('crypto');

// Generate random 6-digit OTP
function generateOTP(phone) {
  const otp = crypto.randomInt(100000, 999999).toString();
  // In production, store OTP in Redis with expiry
  return otp;
}

// Send OTP via SMS (Twilio or other provider)
async function sendOTP(phone, otp) {
  // In production, integrate with Twilio or other SMS provider
  // Example with Twilio:
  // const client = require('twilio')(accountSid, authToken);
  // await client.messages.create({
  //   body: `Your WorkMitra OTP is: ${otp}`,
  //   from: '+1234567890',
  //   to: phone
  // });
  
  console.log(`OTP for ${phone}: ${otp}`); // For development only
  return true;
}

module.exports = {
  generateOTP,
  sendOTP
};
