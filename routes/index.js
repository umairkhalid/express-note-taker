const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notesRouter');

const app = express();

// Base express route for notes requests
app.use('/notes', notesRouter);

module.exports = app;