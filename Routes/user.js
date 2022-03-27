const express = require("express");
const router = express.Router();

const { auth, admin } = require("../Middlewares/auth");

const {
    signupValidator,
    loginValidator,
    updateValidator,
    changePasswordValidator,
    sendOtpValidator,
    resetPasswordValidator,
} = require("../Validators/user");

const {
    signup,
    login,
    update,
    changePassword,
    sendOtp,
    resetPassword,
    logout,
    get,
    getAll,
} = require("../Controllers/user");

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/update", auth, updateValidator, update);
router.post("/update/password", auth, changePasswordValidator, changePassword);
router.post("/reset", sendOtpValidator, sendOtp);
router.post("/reset/password", resetPasswordValidator, resetPassword);
router.post("/logout", auth, logout);
router.post("/", auth, get);
router.post("/all", admin, getAll);

module.exports = router;
