const dotenv = require("dotenv");
const path = require("path");

switch (process.env.NODE_ENV) {
  case "dev":
    dotenv.config({ path: path.join(__dirname, "env", ".env.dev") });
    break;

  case "stage":
    dotenv.config({ path: path.join(__dirname, "env", ".env.stage") });
    break;

  default:
    console.error("Invalid NODE_ENV value:", process.env.NODE_ENV);
    process.exit(1);
}

module.exports = {
  PORT: process.env.PORT,
  secret: process.env.secret,
  URI: process.env.URI,
  twilioSid: process.env.twilioSid,
  twilioToken: process.env.twilioToken,
};
