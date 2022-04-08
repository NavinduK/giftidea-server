var mongoose = require('mongoose');

var gift = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 64, minlength: 4 },
    price: { type: Number, min: 100, default: 1000 },
    store: { type: String },
});

module.exports = mongoose.model('Gift', gift);
