const env = require("../../env");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const message = require("../helper/message");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 401, message: message.noToken });
  }

  jwt.verify(token, env.secret, async (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ status: 403, message: message.invalidToken });
    } else {
      req.decoded = decoded;
      let CheckToken = await Token.findOne({
        userId: req.decoded._id,
        token: token,
        status: true,
      });

      if (!CheckToken) {
        res.status(409).json({
          status: 409,
          message: message.alreadyLogout,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    }
  });
};

module.exports = verifyToken;
