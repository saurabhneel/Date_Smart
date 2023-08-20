const env = require("../../env");
const twilio = require("twilio");
const { generateOTP } = require("../helper/otpGenerator");
const twilioClient = twilio(env.twilioSid, env.twilioToken);

module.exports.sendOTP = async (phoneNumber) => {
  let otp = await generateOTP();
  await twilioClient.messages.create({
    body: `Your Login OTP: ${otp}`,
    from: "+16183684164",
    to: `+91${phoneNumber}`,
  });
  return otp;
};
