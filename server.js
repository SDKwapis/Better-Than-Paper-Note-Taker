// required packages and paths
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const notes = require ('./routes/notes.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);
app.use('/api/notes', notes);

// links the index.html file to the server so it displays
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// links the notes.html file to the server so it displays
app.get('/notes', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.listen(PORT, () => {
 console.log(`LISTENING @ http://localhost:${PORT}`);
});




