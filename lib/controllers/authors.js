const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router().get('/:id', async (req res) =>{
    const id = 
const AuthorId = await Author.getById()
})
.get('/', async (req, res) => {
  const AuthorData = await Author.getAll();
  res.json(AuthorData);
});
