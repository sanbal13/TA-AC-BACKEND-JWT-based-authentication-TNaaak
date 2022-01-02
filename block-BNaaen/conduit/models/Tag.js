const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
  title: { type: String, required: true },
}, { timestamps: true });

const Tag = mongoose.model('User', tagSchema);

module.exports = Tag;
