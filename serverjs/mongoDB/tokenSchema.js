const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,// this is the expiry time in seconds
    },
});
module.exports = mongoose.model("Token", tokenSchema);