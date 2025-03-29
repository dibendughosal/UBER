const userModel = require('../model/userModel');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashedPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generatedAuthToken()
    res.status(201).json({ token, user});   
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400),json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({ message: 'Invalid email or password'})
    }

    const token = await user.generatedAuthToken();
    res.status(200).createUser    


}