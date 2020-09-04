const express = require('express');
const server = require('./server');
const router = express.Router();
const Actions = require('./data/helpers/actionModel.js');

// GET ALL ACTIONS
router.get('/', (req, res) => {
Actions.get()
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
});

// GET ACTION BY ID
router.get('/:id', validateId, (req, res) => {
const id = Number(req.params.id);
Actions.get(id)
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
});

// POST NEW ACTION
router.post('/', validateAction, (req, res) => {
Actions.insert(req.body)
    .then(result => res.status(201).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
});

// UPDATE AN ACTION
router.put('/:id', validateId, (req, res) => {
Actions.update(req.params.id, req.body)
    .then(result => res.status(201).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
});

// DELETE AN ACTION
router.delete('/:id', validateId, (req, res) => {
Actions.remove(req.params.id)
    .then(result => res.status(200).json({ data: result === 1 ? "Action removed" : "Action could not be removed" }))
    .catch(err => res.status(500).json({ error: "Server error" }))
})


// CUSTOM MIDDLEWARE
function validateId(req, res, next) {
Actions.get(req.params.id)
    .then(result => result ? next() : res.status(400).json({ error: "The action with specified ID does not exist" }))
    .catch(err => res.status(500).json({ error: "Server error" }))
}

function validateAction(req, res, next) {
const {project_id, description, notes, completed} = req.body;
if (project_id && description && notes && !completed | completed) {
    next()
} else {
    res.status(400).json({ error: "Please fill out all required fields" })
}
}

module.exports = router;