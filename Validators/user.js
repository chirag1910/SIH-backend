const signupValidator = (req, res, next) => {
    const { name, username, password, sex, mobile, address, aadhar } = req.body;

    if (!name) {
        return res.json({ status: "error", error: "Name is required" });
    }
    if (!username) {
        return res.json({ status: "error", error: "Username is required" });
    }
    if (!password) {
        return res.json({ status: "error", error: "Password is required" });
    }
    if (password.length < 8) {
        return res.json({
            status: "error",
            error: "Password must be minimum 8 characters long",
        });
    }
    if (sex != "male" && sex != "female" && sex != "other") {
        return res.json({
            status: "error",
            error: "Invalid sex type. Valid values: male, female, other",
        });
    }
    if (!mobile) {
        return res.json({
            status: "error",
            error: "Mobile number is required",
        });
    }
    if (!mobile.match(/^\d{10}$/)) {
        return res.json({ status: "error", error: "Invalid mobiile number" });
    }
    if (!address) {
        return res.json({ status: "error", error: "Address is required" });
    }
    if (aadhar && !aadhar.match(/^\d{12}$/)) {
        return res.json({ status: "error", error: "Invalid aadhar number" });
    }
    next();
};

const loginValidator = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
        return res.json({ status: "error", error: "Username is required" });
    }
    if (!password || typeof password !== "string") {
        return res.json({ status: "error", error: "Password is required" });
    }
    next();
};

const updateValidator = (req, res, next) => {
    const { username, password, sex, mobile, aadhar } = req.body;

    if (sex && sex != "male" && sex != "female" && sex != "other") {
        return res.json({
            status: "error",
            error: "Invalid sex type. Valid values: male, female, other",
        });
    }

    if (mobile && !mobile.match(/^\d{10}$/)) {
        return res.json({ status: "error", error: "Invalid mobiile number" });
    }

    if (aadhar && !aadhar.match(/^\d{12}$/)) {
        return res.json({ status: "error", error: "Invalid aadhar number" });
    }

    if (username) {
        delete req.body.username;
    }
    if (password) {
        delete req.body.password;
    }
    next();
};

const changePasswordValidator = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || typeof oldPassword !== "string") {
        return res.json({ status: "error", error: "Old password is required" });
    }
    if (!newPassword || typeof newPassword !== "string") {
        return res.json({ status: "error", error: "New password is required" });
    }
    if (newPassword.length < 8) {
        return res.json({
            status: "error",
            error: "Password must be minimum 8 characters long",
        });
    }
    next();
};

const sendOtpValidator = (req, res, next) => {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
        return res.json({ status: "error", error: "Username is required" });
    }
    next();
};

const resetPasswordValidator = (req, res, next) => {
    const { username, otp, password: newPassword } = req.body;

    if (!username || typeof username !== "string") {
        return res.json({ status: "error", error: "Username is required" });
    }
    if (!otp) {
        return res.json({ status: "error", error: "OTP is required" });
    }
    if (!newPassword || typeof newPassword !== "string") {
        return res.json({ status: "error", error: "New password is required" });
    }
    if (newPassword.length < 8) {
        return res.json({
            status: "error",
            error: "Minimum password length must be 8 characters",
        });
    }
    next();
};

module.exports = {
    signupValidator,
    loginValidator,
    updateValidator,
    changePasswordValidator,
    sendOtpValidator,
    resetPasswordValidator,
};
