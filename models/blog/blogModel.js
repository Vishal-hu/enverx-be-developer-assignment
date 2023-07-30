const mongoose = require("mongoose");

const blogModels = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "userModels",
    },
    blogText: {
        type: String,
        required: true,
        messsage: 'blogText is a required field'
    },

    blogName: {
        type: String,
        required: true,
        messsage: 'blogName is a required field'
    },
    blogCategory: {
        type: String,
        required: true,
        messsage: 'blogCategory is a required field'
    },

},
    { timestamps: true });


module.exports = mongoose.model("blogModels", blogModels);
