const express = require('express');

const db = require('./data/db.js');

const router = express.Router();

//GET 

// If there's an error in retrieving the posts from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.

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

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in retrieving the post from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be retrieved." }.

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

// If the request body is missing the title or contents property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If the information about the post is valid:
// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.

// If there's an error while saving the post:
// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.

router.post('/', (req, res) => {
   const { title, content } = req.body;
   
    if (!title && !content ) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post'});
    } else {
        db.insert({ title, content })
        .then(posts => {
        res.status(201).json({ success: true, posts });
    })
    .catch(err  => {
        res.status(500).json({ 
            success: false, error: 'There was an error while saving the post to the database'
        });
    })
}
});

// Delete 

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in removing the post from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post could not be removed" }.

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.
    remove(id)
    .then(posts => {
        if (posts) {
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

// f the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If the request body is missing the title or contents property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If there's an error when updating the post:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.
// If the post is found and the new information is valid:

// update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.



module.exports = router;