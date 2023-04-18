const mongoose = require('mongoose')
var personSchema = new mongoose.Schema({
    tags: [{
        type: String
    }]
})

const personSchema = mongoose.model('Comments', personSchema);
mongoose.exports = userModel;