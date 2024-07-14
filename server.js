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




// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const uuid = require('./uuid');

// const PORT = process.env.PORT || 3001;
// const app = express();

// const dbPath = path.join(__dirname, 'db/db.json');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'notes.html'));
// });

// app.get('/api/notes', (req, res) => {
//   console.log('GET request received for /api/notes');
//   fs.readFile(dbPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading db.json:', err);
//       res.status(500).json({ error: 'Failed to read db.json' });
//     } else {
//       console.log('GET request successful:', data);
//       res.json(JSON.parse(data));
//     }
//   });
// });

// app.post('/api/notes', (req, res) => {
//   console.info(`${req.method} request to add new note received!`);
//   const { title, text } = req.body;
//   console.log('Request body:', req.body);

//   if (title && text) {
//     const newNote = {
//       title,
//       text,
//       note_id: uuid(),
//     };

//     fs.readFile(dbPath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading db.json:', err);
//         res.status(500).json({ error: 'Failed to read db.json' });
//       } else {
//         const noteArray = JSON.parse(data);
//         noteArray.push(newNote);
//         console.log('Updated note array:', noteArray);

//         fs.writeFile(dbPath, JSON.stringify(noteArray, null, 4), (writeErr) => {
//           if (writeErr) {
//             console.error('Error writing to db.json:', writeErr);
//             res.status(500).json({ error: 'Failed to update db.json' });
//           } else {
//             console.info('Successfully updated db.json!');
//             res.status(201).json(newNote);
//           }
//         });
//       }
//     });
//   } else {
//     res.status(400).json({ error: 'Missing title or text in request body' });
//   }
// });

// app.delete('/api/notes/:id', (req, res) => {
//   const { note_id } = req.params;
//   console.log(`DELETE request received for /api/notes/${note_id}`);

//   fs.readFile(dbPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading db.json:', err);
//       res.status(500).json({ error: 'Failed to read db.json' });
//     } else {
//       let noteArray = JSON.parse(data);
//       noteArray = noteArray.filter(note => note.note_id !== note_id);
//       console.log('Updated note array after delete:', noteArray);

//       fs.writeFile(dbPath, JSON.stringify(noteArray, null, 4), (writeErr) => {
//         if (writeErr) {
//           console.error('Error writing to db.json:', writeErr);
//           res.status(500).json({ error: 'Failed to update db.json' });
//         } else {
//           console.info('Successfully updated db.json!');
//           res.status(200).json({ message: 'Note deleted successfully' });
//         }
//       });
//     }
//   });
// });

// app.get('/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   Note.findById(noteId, (err, note) => {
//       if (err) {
//           return res.status(500).send(err);
//       }
//       if (!note) {
//           return res.status(404).send('Note not found');
//       }
//       res.json(note);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`LISTENING @ http://localhost:${PORT}`);
// });

