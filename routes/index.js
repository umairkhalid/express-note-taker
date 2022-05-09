const express = require('express');

// Import our modular router for /notes
const notesRouter = require('./notesRouter');

const app = express();

// Base express route for notes requests
app.use('/notes', notesRouter);

module.exports = app;