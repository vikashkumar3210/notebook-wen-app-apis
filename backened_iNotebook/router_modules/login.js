const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database_module/modals/User_model.js");
const auth = require("./auth.js");
const router = new express.Router();
//login routing
router.route("/login")
  .get((req, res) => {
    res.send("login page");
  })
  .post(async (req, res) => {
    try {
      //finding user from database
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const x = await bcrypt.compare(req.body.password, user.password);
        if (x) {
          const token = await user.generateToken();

          res.json({ token_: token, result: "successfully logged in" });

        }
        else {
          res.json({ result: "email or password is invalid" });
        }
      }
      else {
        res.json({ result: "email or password is invalid" });
      }
    }
    catch (error) {
      console.log(error);
    }
  });
//logout feature

module.exports = router;