const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.verifyPassword = async function(password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = mongoose.model('User', userSchema);
