var mongoose = require("mongoose");

var user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true });

module.exports = mongoose.model("userModels", user);
