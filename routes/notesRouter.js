// Creating a router for getting and posting notes
const notesRouter = require('express').Router();

// Importing helper and library modules
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// Assigning a path to db.json file
let db = 'db/db.json';

// GET Route for retrieving all the notes in db.json
notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile(db)
        .then((data) => 
            res.json(JSON.parse(data)));
});

// POST Route for adding notes
notesRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {

            id: uuidv4(),
            title,
            text

        };

        readAndAppend(newNote, db);
        res.json(`Note added successfully 🚀`);
        } else {
        res.error('Error in adding note');
        }
});

//DELETE route for a specific note ID
notesRouter.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const noteId = req.params.id;
	readFromFile(db)
    	.then((data) => JSON.parse(data))
            .then((json) => {
                const obj = json.filter((note) => note.id !== noteId);

                writeToFile('db/db.json', obj);

                res.json(`${noteId} has been deleted successfully!`);
            });
});

module.exports = notesRouter;