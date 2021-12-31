const express = require('express');
const Book = require('../../models/Book');
const Comment = require('../../models/Comment');

const router = express.Router();

/* Edit a comment */
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body);
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
});

/* Delete a comment */
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    await Book.findByIdAndUpdate(deletedComment.book, { $pull: { comments: deletedComment.id } });
    res.json(deletedComment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
