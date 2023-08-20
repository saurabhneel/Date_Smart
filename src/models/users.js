const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          const phoneNumberString = value.toString();
          return phoneNumberString.length === 10;
        },
        message: "Mobile Number Must Be Exactly 10 Digits.",
      },
    },
    userStatus: {
      type: Boolean,
      default: false,
      required: true,
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

userSchema.index({ phoneNumber: 1, userStatus: 1 });
const User = mongoose.model("User", userSchema);

module.exports = User;
