require('dotenv').config()
require('../routes/user')
const mongoose = require('mongoose')
const userModel = mongoose.model('userModels')
const jwt = require('jsonwebtoken')

module.exports = async function authorization(req, res, next) {
    let token = '';
    if (req.headers.accesstoken) (token = req.headers.accesstoken);
    if (!token) {
        return res.status(403).json({ success: false, msg: 'provide token' });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = data.id;

        req.user = await userModel.findOne({ _id: data.id });
        return next();
    } catch {
        return res.sendStatus(403);
    }
};