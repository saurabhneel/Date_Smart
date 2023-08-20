const env = require("../../env");

module.exports = {
  PORT: `${env.PORT}`,
  logout: "Logout Successful.",
  noToken: "No Token Provided.",
  invalidToken: "Invalid Token.",
  codeWorking: "Code Is Working.",
  alreadyLogout: "Already Logged Out.",
  loginSuccessful: "Login Successful.",
  somthingWrong: "Something Went Wrong",
  databaseConnected: "Database Connected.",
  otpSent: "OTP Sent To Your Mobile Number.",
  databaseNotConnected: "Database Not Connected.",
  otpExpireOrInvalid: "OTP Expired Or Invalid OTP.",
};
