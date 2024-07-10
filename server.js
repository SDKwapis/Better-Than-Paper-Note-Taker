const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const uuid = require('./uuid');

const PORT = 3001;
const app = express();

app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  return res.json(db);
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request to add new note received!`);
  const { title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    const response = {
      status: 'success',
      body: newNote,
    };
    res.status(201).json(response);
  } else {
    res.status(500).json('Error posting new note');
  }
});

app.listen(PORT, () => 
    console.log(`LISTENING @ http://localhost:${PORT}`)
);