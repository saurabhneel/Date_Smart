const { body, validationResult } = require("express-validator");

const userValidation = body("phoneNumber")
  .notEmpty()
  .withMessage("Phone Number is required.")
  .isNumeric()
  .withMessage("Phone Number must be numeric.")
  .isLength({ min: 10, max: 10 })
  .withMessage("Phone Number must be exactly 10 digits.");

const otpValidation = body("otp")
  .notEmpty()
  .withMessage("OTP is required.")
  .isNumeric()
  .withMessage("OTP must be numeric.")
  .isLength({ min: 6, max: 6 })
  .withMessage("OTP Must Be Exactly 6 Digits.");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(422).json({ errors: errorMessages });
  }
  next();
};

module.exports = {
  validate,
  otpValidation,
  userValidation,
};
