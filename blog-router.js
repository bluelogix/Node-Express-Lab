const express = require('express');

const db = require('./data/db.js');

const router = express.Router();

//GET 
router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json({ success: true, posts });
    })
    .catch(err => {
        res.status(500).json({ success: false, error : 'There post information could not be retrieved'})
    })
})

// GET by id
router.get('/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
    .then(posts=> {
        if (posts) {
            res.status(201).json({success: true , posts});
        } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({  error: "The post information could not be retrieved."})
    })
})


// Post 
router.post('/', (req, res) => {
   const { title, contents } = req.body;
   
    if (!title || !contents ) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post'});
    } else {
        db.insert({ title, contents })
        .then(post => {
        res.status(201).json( post );
    })
    .catch(err  => {
        res.status(500).json({ 
             error: 'There was an error while saving the post to the database'
            });
        })
    }
});

// Delete 
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.
    remove(id)
    .then(post => {
        if (post) {
            res.status(204).end();
        } else {
            res.status(404).json({ success: false, message: "The post with the specified ID does not exist." });
        }
    })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })  
    })
})


// Put 
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(postUpdated => {
        if( !postUpdated) {
            res.status(404).json({ success: false, message: 'The post with the specified ID does not exist.' })
        } else if ( !changes.title || !changes.contents ) {
            return res.status(400).json({  success: false, errorMessage: 'Please provide title and contents for the post.' })

        } else {
            return res.status(200).json({ success: true, changes })
        }
    })
    .catch(err => {
        res.status(500).json({  success: false, error: 'The post information could not be modified'})
    })
})
module.exports = router;