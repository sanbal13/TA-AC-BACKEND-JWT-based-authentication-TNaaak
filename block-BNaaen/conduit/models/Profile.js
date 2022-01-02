const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  age: { type: Number, min: 18, max: 80 },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
