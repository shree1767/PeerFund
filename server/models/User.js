const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    age: Number,
    gender: String,
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    walletAddress: String,
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;