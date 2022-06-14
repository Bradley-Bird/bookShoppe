const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router.get('/', async (req, res) => {
  const AuthorData = await Author.getAll();
  const finalData = AuthorData.map((author) => author);
  res.json(finalData);
});
