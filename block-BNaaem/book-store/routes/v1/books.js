const express = require('express');
const Book = require('../../models/Book');

const router = express.Router();

/* GET list of all books */
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find({});
    if (books.length === 0) {
      res.status(400).json({ error: 'No book available' });
    }
    res.json({ books });
  } catch (error) {
    next(error);
  }
});

/* GET book with the given id */
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(400).json({ error: 'Book not found' });
    }
    res.json({ book });
  } catch (error) {
    next(error);
  }
});

/* Create a book */
router.post('/', async (req, res, next) => {
  try {
    const createdBook = await Book.create(req.body);
    res.json(createdBook);
  } catch (error) {
    next(error);
  }
});

/* Update a book */
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
});

/* Delete a book */
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    res.json(deletedBook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
