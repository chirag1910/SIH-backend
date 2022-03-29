const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        sex: {
            type: String,
            enum: ["male", "female", "other"],
        },
        email: {
            type: String,
        },
        mobile: {
            type: Number,
        },
        address: {
            type: String,
        },
        aadhar: {
            type: Number,
        },
        otp: {
            type: Number,
        },
        otpExpire: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
