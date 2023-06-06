const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
require("./database_module/database_connection.js");
const signupRoute = require("./router_modules/signupRoute.js")
const loginRoute = require("./router_modules/login.js");
const userNoteRoute = require("./router_modules/userNotes.js");
const app = express();
app.use(cors({
    origin:'*'
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
// All routes
app.use(userNoteRoute);
app.use(signupRoute);
app.use(loginRoute);



app.listen(5000,()=>{
    console.log("server is running");
})
