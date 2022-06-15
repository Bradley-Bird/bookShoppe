const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newBook = await Book.insert(req.body);
      res.json(newBook);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const BookData = await Book.getAll();
    res.json(BookData);
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const bookId = await Book.getById(id);
    res.json(bookId);
  });
