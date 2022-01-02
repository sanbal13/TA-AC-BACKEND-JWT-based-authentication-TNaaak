const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  age: { type: Number, min: 18, max: 80 },
  password: { type: String, minLength: 5, required: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

userSchema.methods.signToken = function () {
  const payload = {userId: this.id, email: this.email};
  try {
    const token = await jwt.sign(payload, process.env.SECRET);
    return token;
  } catch (error) {
    next(error);
  }  
};

userSchema.methods.userJSON = function(token) {
  return {
    name: this.name,
    email: this.email,
    token,
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
