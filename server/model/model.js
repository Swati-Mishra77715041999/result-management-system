const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    rollNo : {
        type: Number,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    birthDate : {
        type: Date
    },
    score : {
        type: Number,
        required: true,
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;