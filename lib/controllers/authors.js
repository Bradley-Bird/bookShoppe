const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const authorId = await Author.getById(id);
    res.json(authorId);
  })
  .get('/', async (req, res) => {
    const AuthorData = await Author.getAll();
    res.json(AuthorData);
  });
