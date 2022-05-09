// Import express packages
const express = require('express');
const path = require('path');

// Import custom middleware information to log the request type and path to the server
const { clog } = require('./middleware/clog');

// Import routing paths and assign it to the variable api
const api = require('./routes/index');

// Set to listen on port 3001 or environment varialble assigned port
const PORT = process.env.PORT || 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

//Import to serve static files such as images, CSS files, and JavaScript files, in a directory named public
app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a index.html page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Listens to the port 3001 for requests
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

