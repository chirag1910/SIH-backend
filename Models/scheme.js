const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["general", "women", "student", "pc", "farmer"],
    },
    minIncome: {
        type: Number,
    },
    maxIncome: {
        type: Number,
    },
    mode: {
        type: String,
        required: true,
        enum: ["offline", "online"],
    },
    link: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Scheme", schemeSchema);
