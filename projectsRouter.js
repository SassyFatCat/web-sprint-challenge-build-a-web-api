const express = require('express');
const router = express.Router();
const Projects = require('./data/helpers/projectModel.js');

// GET ALL PROJECTS
router.get('/', (req, res) => {
Projects.get()
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
});

// GET PROJECT BY ID
router.get('/:id', validateId, (req, res) => {
const id = Number(req.params.id);
Projects.get(id)
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
    });

// GET ALL ACTIONS BY PROJECT ID
router.get('/:id', validateId, (req, res) => {
Projects.getProjectActions(req.params.id)
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
});

// POST A NEW PROJECT
router.post('/', validateProject, (req, res) => {
Projects.insert(req.body)
    .then(result => res.status(201).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
});

// DELETE A PROJECT
router.delete('/:id', validateId, (req, res) => {
Projects.remove(req.params.id)
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ error: "Server error" }))
})

// UPDATE A PROJECT
router.put('/:id', validateId, (req, res) => {
const id = Number(req.params.id);
Projects.update(id, req.body)
    .then(result => res.status(200).json({ data: result }))
    .catch(err => res.status(500).json({ data: "Server error" }))
})

// CUSTOM MIDDLEWARE
function validateId(req, res, next) {
const id = Number(req.params.id)
Projects.get(id)
    .then(result => {
        result ? next() : res.status(400).json({ error: "Unable to locate project with specified ID" })
    })
    .catch(err => res.status(500).json({ error: "Server error" }))
}

function validateProject(req, res, next) {
const {name, description} = req.body;
if (name && description) {
    next();
} else {
    res.status(400).json({ error: "Please fill out all required fields" })
}
}

module.exports = router;