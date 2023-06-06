const mongoose = require("mongoose");
// Schema for NOTES
const userNoteSchema = new mongoose.Schema({
    //here we add objectid of curent user to link note document associated with it
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "all"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = new mongoose.model("Note", userNoteSchema);
module.exports = Note;