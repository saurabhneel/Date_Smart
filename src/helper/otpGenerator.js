const crypto = require("crypto");

module.exports.generateOTP = async () => {
  const otpBuffer = crypto.randomBytes(4);
  const otp = otpBuffer.readUIntBE(0, 4);
  return (otp % 1000000).toString().padStart(6, "0");
};
