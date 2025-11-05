const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: String,
    password: String
});

module.exports = mongoose.model('Customer', customerSchema);