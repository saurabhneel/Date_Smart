const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    otp: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const otpString = value.toString();
          return otpString.length === 6;
        },
        message: "OTP Must Be Exactly 6 Digits.",
      },
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
);

otpSchema.index({ userId: 1, otp: 1, createdAt: 1 });
const otp = mongoose.model("OTP", otpSchema);

module.exports = otp;
