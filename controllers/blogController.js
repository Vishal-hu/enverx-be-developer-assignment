require("dotenv").config();
require("../models/user/userModel");
require("../models/blog/blogModel")
const express = require("express");


const router = express.Router();
const mongoose = require("mongoose");
const blogModel = mongoose.model("blogModels");

const messages = require("../helpers/message");
const errors = require("../helpers/error");

// get all blogs
const getAllPosts = async (req, res) => {
    try {
        let query = {}
        if (req.body.blogCategory)
            (query.blogCategory = req.body.blogCategory)
        if (req.body.blogName)
            (query.blogName = req.body.blogName)


        const userblog = await blogModel.find(query)
            .sort({ "createdAt": -1 })

        res.status(200).json({ userblog })
    } catch (error) {
        console.log(error);
    }
}

// get blog by id
const getPostById = async (req, res) => {
    try {
        const userblog = await blogModel.findOne({ _id: req.params.id })

        res.status(200).json({ userblog: userblog ? userblog : [] })
    } catch (error) {
        console.log(error);
    }
}

// create new blog

const createBlog = async (req, res) => {
    const body = req.body;

    try {
        const newBlog = new blogModel({
            userId: req.userId,
            blogText: body.blogText,
            blogName: body.blogName,
            blogCategory: body.blogCategory,
        })

        // Validate the newBlog instance
        const validationError = newBlog.validateSync();

        if (validationError) {
            for (let field in validationError.errors) {
                return res
                    .status(500)
                    .json({ success: true, msg: validationError.errors[field].message });
            }
        } else {
            // No validation error, save the document
            newBlog.save()
                .then(() => {
                    return res
                        .status(201)
                        .json({ success: true, msg: messages.BLOG_SUCCESSFULLY_CREATED });
                })
                .catch((err) => console.error(err));
        }
    }
    catch (error) {
        console.log(error);
    }
};

// update blog
const updateBlog = async (req, res) => {
    const body = req.body;

    try {
        if (req.params.id) {
            const isBlogExists = await blogModel.findOne({ _id: req.params.id })

            if (isBlogExists) {
                await blogModel.updateOne({
                    _id: req.params.id
                }, {
                    $set: {
                        blogText: body.blogText,
                        blogName: body.blogName,
                        blogCategory: body.blogCategory,
                    }
                })
                return res.status(200)
                    .json({ success: true, msg: messages.SUCCESSFULLY_UPDATED });
            } else {
                return res.status(404)
                    .json({ success: true, msg: messages.BLOG_NOT_FOUND });
            }

        } else {
            return res.status(404)
                .json({ success: true, msg: messages.MISSING_ERROR });
        }
    } catch (error) {
        console.log(error);
    }
}


const deleteBlog = async (req, res) => {
    try {
        if (req.params.id) {
            await blogModel.deleteOne({ _id: req.params.id })
            res.status(200).json({ msg: messages.SUCCESSFULLY_DELETED })
        } else {
            res.status(200).json({ msg: messages.MISSING_ERROR })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createBlog,
    updateBlog,
    deleteBlog
};