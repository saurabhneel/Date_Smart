const mongoose = require("mongoose");

const userProfile = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const nameRegex = /^[A-Za-z\s]+$/;
          return nameRegex.test(value);
        },
        message: "Invalid name. Only spaces and alphabets are allowed.",
      },
    },
    dateOfBirth: {
      type: Date,
      required: true,
      match: [
        /^\d{4}-\d{2}-\d{2}$/,
        'Invalid date format. Please use the format "MM-DD-YYYY".',
      ],
    },
    intersts: {
      type: Array,
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 5 && value.length <= 10;
        },
        message:
          "You cannot add more than 10 interests and minimum 5 interests are required.",
      },
    },
    about: {
      type: String,
      maxlength: 500,
      validate: {
        validator: function (value) {
          return value.length <= 500;
        },
        message: "The About field should not exceed 500 characters.",
      },
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

userProfile.index({ userId: 1, token: 1 });
const userProfiles = mongoose.model("userProfile", userProfile);

module.exports = userProfiles;
