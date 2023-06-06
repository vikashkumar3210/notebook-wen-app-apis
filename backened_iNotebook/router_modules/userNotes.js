const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../database_module/modals/User_model.js");
const Note = require("../database_module/modals/Note_model.js");
const router = new express.Router();
const auth = require("./auth.js");

//Fetching all user notes route

router.get("/getUserNotes", auth, async (req, res) => {
    const user_All_Notes = await Note.find({ user: req.user.id });
    if (user_All_Notes) {
        res.json({ msg: user_All_Notes });
    }
    else {
        res.status(400).json({ msg: "not getting" });
    }
});

//Adding notes route

router.post("/addUserNotes", auth, [
    check("title", "Enter a valid title").isLength({ min: 5, max: 20 }),
    check("description", "Enter a description have more than 10 character").isLength({ min: 5 }),
    check("tag", "Enter a valid tag").isLength({ min: 6 })
], async (req, res) => {
    //During validation any error found store in errors
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send("Error in saving");
        }
        else {
            const { title, description, tag } = req.body;
            const addNote = new Note({
                user: req.user.id,
                title,
                description,
                tag
            });
            await addNote.save();
            res.status(201).send("Note successfully save");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Error in saving note")
    }

});

//Update existing note route
router.put("/updateNote/:id", auth, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    //find the note of given id
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(400).send("not found");
    }

    else if (note.user.toString() != req.user.id) {
        res.status(401).send("access denied");
    }
    else {
        const findNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote });
        res.json(findNote);
    }
});

//Deleting existing notes
//Note:- Here DELETE method not working that why i am using GET request
router.delete("/deleteNote/:id", auth, async (req, res) => {
    try {
        //finding note
        const findNote = await Note.findById(req.params.id);

        if (!findNote) {
            res.status(400).send("we not  found");
        }
        else if (findNote.user.toString() != req.user.id) {
            res.status(401).send("access denied");
        }
        else {
            //deleting note
            await Note.findByIdAndDelete(req.params.id);
            res.send("successfully deleted");
        }
    }
    catch (error) {
        console.log(error);
    }
});


module.exports = router;