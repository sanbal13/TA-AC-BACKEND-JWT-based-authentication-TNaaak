const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
