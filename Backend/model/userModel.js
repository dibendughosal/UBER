const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: [3, "First Name must be at least 3 characters"]
    },
    lastname: {
        type: String,
        // required: true,
        minLength: [3, "last Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be at least 3 characters"]
    }, 
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }

})

userSchema.methods.generatedAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashedPassword = async function (password){
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;