const router = require("express").Router();
const verifyToken = require("../middleware/jwt");
const UserController = require("../controllers/users");
const { validate } = require("../middleware/validationRules");
const { otpValidation } = require("../middleware/validationRules");
const { userValidation } = require("../middleware/validationRules");

router.post("/logout", verifyToken, UserController.logout);
router.post("/login", userValidation, validate, UserController.login);
router.post("/updateProfile", verifyToken, UserController.addProfile);
router.post("/verifyLogin", otpValidation, validate, UserController.verifyLogin);

module.exports = router;
