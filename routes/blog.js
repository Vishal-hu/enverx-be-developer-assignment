const express = require("express");
const router = express.Router();

let blogController = require('../controllers/blogController')

router.get('/posts', blogController.getAllPosts)
router.get('/posts/:id', blogController.getPostById)
router.post('/posts', blogController.createBlog)
router.put('/posts/:id', blogController.updateBlog)
router.delete('/posts/:id', blogController.deleteBlog)
module.exports = router;