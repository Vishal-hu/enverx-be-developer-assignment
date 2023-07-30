require("dotenv").config();
require("../models/user/userModel");
const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const userModel = mongoose.model("userModels");

const messages = require("../helpers/message");
const errors = require("../helpers/error");
const jwt = require("jsonwebtoken");
const { hashedPasswordFunc, hashCompare } = require("../utils/bcrypthash");

const register = async (req, res) => {
    const data = req.body;
    try {
        if (data?.username && data?.password) {
            const isExist = await userModel.findOne({ username: req.body.username });
            if (isExist) {
                res.status(400).json({ success: false, msg: messages.USER_FOUND });
            } else {
                const hashedPassword = await hashedPasswordFunc(data.password);
                let insertedUser = await userModel.insertMany({
                    username: data.username,
                    password: hashedPassword,
                });
                res.status(201).send({ msg: messages.USER_REGISTERED, user: insertedUser[0] });
            }
        } else {
            res.status(203).send({ msg: messages.USER_INFORMATION });
        }

    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    const data = req.body;
    try {
        if (data?.username && data?.password) {
            let isExist = await userModel.findOne({
                username: data.username,
            });
            if (isExist) {

                const hashCompared = await hashCompare(data.password, isExist.password);
                if (hashCompared) {
                    const secret = process.env.SECRET_KEY;
                    const token = jwt.sign(
                        {
                            id: isExist._id,
                        },
                        secret
                    );
                    res
                        .status(200)
                        .json({
                            success: true,
                            msg: messages.LOG_IN,
                            accesstoken: token,
                            uid: isExist._id,
                            userInfo: isExist,
                        });
                } else {
                    res
                        .status(400)
                        .json({ code: errors.FOUND_ERROR, msg: messages.NOT_FOUND });
                }

            } else {
                res
                    .status(400)
                    .json({ code: errors.FOUND_ERROR, msg: messages.NOT_FOUND });
            }
        } else {
            res
                .status(400)
                .json({ code: errors.MISSING_ERROR, msg: messages.MISSING_ERROR });

        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    register,
    login
};
