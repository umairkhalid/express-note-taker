const express = require('express');
const path = require('path');
const fs = require('fs');
//const api = require('./routes/index');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//api.use('/api', api);

app.use(express.static('public'));

let data = require('./db/db.json');

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for retrieving all the tips
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
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

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const found = data.some(obj => obj.id === req.params.id);
    if (found) {
        data = data.filter(obj => obj.id !== req.params.id);

        writeToFile('./db/db.json', data);
        res.json(`Note deleted successfully 🚀`);
        }
});

// Wildcard route to direct users to a index.html page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

