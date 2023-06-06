const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../database_module/modals/User_model.js");

const app = express();
const router = new express.Router();
router.route("/signup")
   .get((req, res) => {

      res.send("happy");

   })
   //data validation of user
   .post([check("name", "Enter a valid name").isLength({ min: 10 }),
   check("email", "Enter a valid email").isEmail(),
   check("password", "Enter a valid password").isLength({ min: 10, max: 40 })
   ],
      async (req, res) => {
         try {
            //During validation any error found store in errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
               res.status(400).json({ result: "Signup Error" });
            }
            else {
               //checking user exist or not with given email
               const username = await User.findOne({ email: req.body.email });
               if (!username) {
                  //creating user and save to database
                  if (req.body.password != req.body.confirmedPassword) {
                     res.status(400).json({ result: "password not matching" });
                  }
                  else {
                     const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        confirmedPassword: req.body.confirmedPassword
                     });
                     await user.save();
                     const token = await user.generateToken();
                     res.status(201).json({ token: token, result: "user successfully created" });
                  }
               }
               else {
                  res.status(400).json({ result: "user with this eamil already exist" });
               }
            }

         }
         catch (error) {
            res.status(400).json({ result: "try after some time" });
         }

      });
module.exports = router;