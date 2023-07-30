const express = require('express');
const router = express.Router()

const authorization = require('./jwt');

const unless = function (middleware, ...paths) {
    return function (req, res, next) {
        const pathCheck = paths.some((path) => path === req.path);
        pathCheck ? next() : middleware(req, res, next);
    };
};

router.use(unless(authorization,
    '/login',
    '/register',
))

module.exports = router