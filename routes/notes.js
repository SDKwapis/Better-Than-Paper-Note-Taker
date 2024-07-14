const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../uuid');

const dbPath = path.join(__dirname, '../db/db.json');

// function to get the array of note objects from the db.json file and make them available to be displayed on the site
const getNotes = (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read db.json' });
    } else {
      res.json(JSON.parse(data));
    }
  });
};

// function to add a new note to the db.json file
const addNote = (req, res) => {
  console.info(`${req.method} request to add new note received!`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read db.json' });
      } else {
        const noteArray = JSON.parse(data);
        noteArray.push(newNote);

        fs.writeFile(dbPath, JSON.stringify(noteArray, null, 4), (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
            res.status(500).json({ error: 'Failed to update db.json' });
          } else {
            console.info('Successfully updated db.json!');
            res.status(201).json(newNote);
          }
        });
      }
    });
  } else {
    res.status(400).json({ error: 'Missing title or text in request body' });
  }
};

// function to delete a note by its' id from the db.json file
const deleteNote = (req, res) => {
  const { id } = req.params;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read db.json' });
    } else {
      let noteArray = JSON.parse(data);
      noteArray = noteArray.filter(note => note.id !== id);

      fs.writeFile(dbPath, JSON.stringify(noteArray, null, 4), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          res.status(500).json({ error: 'Failed to update db.json' });
        } else {
          console.info('Successfully updated db.json!');
          res.status(200).json({ message: 'Note deleted successfully' });
        }
      });
    }
  });
};

// defines the routes for each function
router.get('/', getNotes);
router.post('/', addNote);
router.delete('/:id', deleteNote);

module.exports = router;


