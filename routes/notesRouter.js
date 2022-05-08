const notesRouter = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

let data = require('../db/db.json');

// GET Route for retrieving all the tips
notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notesRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {

            id: uuidv4(),
            title,
            text

        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Tip added successfully 🚀`);
        } else {
        res.error('Error in adding tip');
        }
});

notesRouter.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const found = data.some(obj => obj.id === req.params.id);
    if (found) {
        data = data.filter(obj => obj.id !== req.params.id);

        writeToFile('./db/db.json', data);
        res.json(`Note deleted successfully 🚀`);
        }
});

module.exports = notesRouter;