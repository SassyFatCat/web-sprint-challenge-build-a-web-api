const express = require('express');
const server = require('./server');
const router = express.Router();
const Actions = require('./data/helpers/actionModel.js');

// GET ALL ACTIONS
router.get('/', (req, res) => {
Actions.get()
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
})

module.exports = router;