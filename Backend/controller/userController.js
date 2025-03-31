const userModel = require('../model/user.Model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        console.log("Request Body:", req.body);

        let { fullname, email, password } = req.body;

        // ✅ Check if all fields are provided
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let firstname = "";
        let lastname = "";

        // ✅ Handle both string and object formats for `fullname`
        if (typeof fullname === "string") {
            [firstname, lastname = ""] = fullname.split(" ");
        } else if (typeof fullname === "object" && fullname.firstname && fullname.lastname) {
            firstname = fullname.firstname;
            lastname = fullname.lastname;
        } else {
            return res.status(400).json({ message: "Invalid fullname format" });
        }

        // ✅ Hash the password
        const hashPassword = await userModel.hashPassword(password);
        console.log("Hashed Password Before Saving:", hashPassword);

        // ✅ Save the user
        const user = await userService.createUser({
            fullname: firstname,
            lastname,
            email: email.toLowerCase(),
            password: hashPassword
        });

        // ✅ Generate token
        const token = user.generateAuthToken();
        res.status(201).json({
            token,
            user: { _id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};



module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user and include password
        const user = await userModel.findOne({ email: email.toLowerCase() }).select('+password');
        console.log("User found in DB:", user ? user : "No user found");

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare entered password with stored password
        const isMatch = await user.comparePassword(password);
        console.log("Password Match:", isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ 
            token, 
            user: { _id: user._id, fullname: user.fullname, email: user.email } 
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};
