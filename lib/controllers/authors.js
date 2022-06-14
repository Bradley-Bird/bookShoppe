const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router().get('/', async (req, res) => {
  const AuthorData = await Author.getAll();
  res.json(AuthorData);
});
