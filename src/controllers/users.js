const env = require("../../env");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const otp = require("../models/otp");
const User = require("../models/users");
const Token = require("../models/token");
const message = require("../helper/message");
const { sendOTP } = require("../services/twilio");
const userProfiles = require("../models/userProfile");

class UserController {
  static async login(req, res) {
    try {
      let phoneNumber = req.body.phoneNumber;

      let user = await User.findOneAndUpdate(
        { phoneNumber: phoneNumber },
        {},
        { upsert: true, new: true }
      );

      let OTP = await sendOTP(phoneNumber);
      await otp.deleteMany({ userId: user._id });
      await otp.create({ userId: user._id, otp: OTP });

      return res.status(200).json({
        status: 200,
        _id: user._id,
        message: message.otpSent,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: message.somthingWrong });
    }
  }

  static async verifyLogin(req, res) {
    try {
      const _id = new mongoose.Types.ObjectId(req.body._id);
      const OTP = req.body.otp;

      const otpExpiration = new Date(Date.now() - 5 * 60000);
      const matchedOTP = await otp.findOne({
        userId: _id,
        otp: OTP,
        createdAt: { $gte: otpExpiration },
      });

      if (!matchedOTP) {
        return res
          .status(422)
          .json({ status: 422, message: message.otpExpireOrInvalid });
      }

      await otp.deleteMany({ userId: _id });
      await User.updateOne({ _id: _id }, { userStatus: true });

      const payload = {
        _id: _id,
      };

      const accessToken = jwt.sign(payload, env.secret);
      await Token.updateMany({ userId: _id }, { status: false });
      await Token.create({ userId: _id, token: accessToken });
      let doc = await userProfiles.countDocuments({ userId: _id });

      return res.status(200).json({
        status: 200,
        profileStatus: doc,
        accessToken: accessToken,
        message: message.loginSuccessful,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: message.somthingWrong });
    }
  }

  static async addProfile(req, res) {
    try {
      let _id = req.decoded._id;
      let { name, dateOfBirth, about, intersts } = req.body;
      let date = new Date(dateOfBirth).toISOString();
      let profile = await userProfiles.create({
        userId: _id,
        name: name,
        about: about,
        intersts: intersts,
        dateOfBirth: new Date(date),
      });
      console.log(profile);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: message.somthingWrong });
    }
  }

  static async logout(req, res) {
    try {
      let accessToken = req.header("Authorization").split(" ")[1];
      let logout = await Token.updateOne(
        { userId: req.decoded._id, token: accessToken },
        { status: false, updatedAt: new Date() }
      );

      if (logout.modifiedCount === 1) {
        return res.status(200).json({ status: 200, message: message.logout });
      } else {
        return res.status(409).json({
          status: 409,
          message: message.alreadyLogout,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: message.somthingWrong });
    }
  }
}

module.exports = UserController;
