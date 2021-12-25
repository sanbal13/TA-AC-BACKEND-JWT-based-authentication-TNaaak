const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5}
}, 
{ timestamps: true}
);

userSchema.pre('save', async function(next) {
    if(this.password && this.isModified(password)){
    this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.verifyPassword = async function(password) {
    try {
        let result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        next(error);
    }
}

module.exports = mongoose.model('User', userSchema);