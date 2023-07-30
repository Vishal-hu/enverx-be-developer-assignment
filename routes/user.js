const express = require("express");
const router = express.Router();

let userController = require('../controllers/userController')

router.all('/register', userController.register)
router.all('/login', userController.login)

module.exports = router;