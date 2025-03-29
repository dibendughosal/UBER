const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/userController');


router.post('/register', [
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage
    ('First Name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage
    ("Password must be atleast 6 characters long")
])


module.exports = router