const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../database_module/modals/User_model.js")
const app = express();
app.use(cookieParser());
const auth = async function (req, res, next) {
    try {
        const token1 = await req.headers.token;

        if (token1 !== null) {
            const verifyUser = await jwt.verify(token1, process.env.SECRET_KEY);
            const user = await User.findOne({ _id: verifyUser.id }).select({ password: 0 }); //get user without password field
            if (user) {
                req.user = user;
                req.token = token1;
                next();
            }
            else {
                res.json({ msg: "access denied" });
            }
        }
        else {
            res.json({ msg: "access denied" });
        }

    }
    catch (error) {
        res.json({ msg: 'internal server error' });
    }
}

module.exports = auth;





