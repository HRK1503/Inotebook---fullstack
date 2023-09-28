const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note= require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: get all the notes using :GET "api/notes/fetchallnotes" login req
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: adding new note using:POST "api/notes/addnote" login req
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // if (!mongoose.isValidObjectId(req.user.id)) {
        //     return res.status(400).json({ error: 'Invalid user ID' });
        // }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router