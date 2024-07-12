const fb = require('express').Router();
const fs = require('fs');
const uuid = require('../uuid');
const db = require('../db/db.json');


fb.get('/api/notes', (req, res) => {
    return res.json(db);
  });
  
  fb.post('/api/notes', (req, res) => {
    console.info(`${req.method} request to add new note received!`);
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
      
          const noteString = JSON.parse(data);
  
          noteString.push(newNote);
  
          fs.writeFile(
            './db/db.json',
            JSON.stringify(noteString, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated db.json!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error posting new note');
    }
  });

  module.exports = fb;
