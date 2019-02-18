const express = require('express'); //import a CommonJS module 

const blogRouter = require('./blog-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', blogRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Node-Express-Lab</h2>
    
  `);
});



module.exports = server;