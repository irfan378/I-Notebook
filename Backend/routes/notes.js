const express = require("express");

const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1:Get all notes using :GET "api/notes/getuser".Login required
router.get('/fetchallnote', fetchUser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
// Route 2:Add a new note using :POST "api/notes/"addnote.Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description should be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if there are errors,return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
// Route 3:Update an exsisting note using :PUT "api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote book
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find the note  to be updated and update it.
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
// Route 4:Delete an exsisting note using :DELETE "api/notes/updatenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {

        // Find the note  to be deleted and delete it.
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Sucess": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router;