const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();
// Schema for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmedPassword: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }

});
userSchema.pre('save', async function (next) {
    //hashing of password
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
        this.confirmedPassword = undefined;

    }
    next();
});
//generating token for user
userSchema.methods.generateToken = async function () {
    try {
        const token = await jwt.sign({ id: this.id }, process.env.SECRET_KEY);
        return token;
    }
    catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model("User", userSchema);
module.exports = User;