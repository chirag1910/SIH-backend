const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/generateToken");
const generateOTP = require("../Utils/generateOtp");
const mailOtp = require("../Utils/mailOtp");

const signup = async (req, res) => {
    const { username, password: plainPassword } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            const password = await bcrypt.hash(plainPassword, 7);

            const user = await User.create({ ...req.body, password });

            const token = generateToken(user._id);

            res.cookie("JWT_TOKEN", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                status: "ok",
                message: "User signed up successfully",
                name: user.name,
                username: user.username,
                sex: user.sex,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                aadhar: user.aadhar,
                token,
            });
        } else {
            return res.json({
                status: "error",
                error: "Username already exists",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);

            res.cookie("JWT_TOKEN", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                status: "ok",
                message: "User logged in successfully",
                name: user.name,
                username: user.username,
                sex: user.sex,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                aadhar: user.aadhar,
                token,
            });
        } else {
            return res.json({
                status: "error",
                error: "Invalid username or password",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const update = async (req, res) => {
    const { userID } = req.body;

    try {
        const user = await User.findById(userID);
        await user.updateOne(req.body);

        return res.json({
            status: "ok",
            message: "User updated successfully",
        });
    } catch (error) {
        return res.json({ status: "error", error: "Some error occurred" });
    }
};

const changePassword = async (req, res) => {
    const { userID, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userID);

        if (user) {
            if (await bcrypt.compare(oldPassword, user.password)) {
                const password = await bcrypt.hash(newPassword, 7);

                await user.updateOne({
                    password,
                });

                return res.json({
                    status: "ok",
                    message: "Password changed successfully",
                });
            } else {
                return res.json({
                    status: "error",
                    error: "Incorrect password",
                });
            }
        } else {
            return res.json({ status: "error", error: "User not found" });
        }
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const sendOtp = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            if (user.email) {
                const otp = generateOTP();
                const otpExpire = new Date(
                    new Date().getTime() + 30 * 60 * 1000
                );

                mailOtp(user.email, otp);
                await user.updateOne({ otp, otpExpire });

                return res.json({
                    status: "ok",
                    message: "OTP sent successfully",
                });
            } else {
                return res.json({
                    status: "error",
                    error: "Email ID not registered",
                });
            }
        } else {
            return res.json({ status: "error", error: "User not found" });
        }
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const resetPassword = async (req, res) => {
    const { username, otp, password: newPassword } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            if (user.otp == otp) {
                if (user.otpExpire >= new Date()) {
                    const password = await bcrypt.hash(newPassword, 7);

                    await user.updateOne({
                        password,
                        otpExpire: new Date(new Date().getTime() - 1),
                    });

                    return res.json({
                        status: "ok",
                        message: "Password changed successfully",
                    });
                } else {
                    return res.json({ status: "error", error: "OTP expired" });
                }
            } else {
                return res.json({ status: "error", error: "Invalid OTP" });
            }
        } else {
            return res.json({ status: "error", error: "User not found" });
        }
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const logout = async (req, res) => {
    res.cookie("JWT_TOKEN", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res.json({ status: "ok", message: "Logged out successfully" });
};

const get = async (req, res) => {
    const { userID: _id } = req.body;
    try {
        const user = await User.findOne({ _id });

        if (user) {
            return res.json({
                status: "ok",
                name: user.name,
                username: user.username,
                sex: user.sex,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                aadhar: user.aadhar,
            });
        } else {
            return res.json({ status: "error", error: "User not found" });
        }
    } catch (error) {
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
};

const getAll = async (req, res) => {
    const users = await User.find({});
    return res.json({ status: "ok", response: users });
};

module.exports = {
    signup,
    login,
    update,
    changePassword,
    sendOtp,
    resetPassword,
    logout,
    get,
    getAll,
};
