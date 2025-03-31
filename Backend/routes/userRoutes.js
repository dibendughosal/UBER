const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage
    ('First Name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage
    ("Password must be atleast 6 characters long")
],
    userController.registerUser
)
router.post('/login', [
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({ min: 6}).withMessage('Password must be 6 characters')
],
    userController.loginUser
)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile)

module.exports = router;