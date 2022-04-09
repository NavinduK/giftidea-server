var mongoose = require('mongoose');

var people = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 254 },
    birthDate: { type: Date, required: true},
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    gifts: [{type: mongoose.Schema.ObjectId, ref: 'Gift'}],
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('People', people);