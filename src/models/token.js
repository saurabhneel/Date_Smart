const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
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

tokenSchema.index({ userId: 1, token: 1 });
const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
