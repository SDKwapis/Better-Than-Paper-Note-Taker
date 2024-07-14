// sets up a routing system for notes

const router = require('express').Router();
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
