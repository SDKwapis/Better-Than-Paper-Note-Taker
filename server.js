const express = require('express');
const db = require('./db/db.json');

const PORT = 3001;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join('index.html'));
});

app.listen(PORT, () => 
    console.log(`LISTENING @ http://localhost:${PORT}`)
);