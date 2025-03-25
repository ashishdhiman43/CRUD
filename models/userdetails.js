const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    age: String,
    salary: String,
    designation: String,
    address: String,
}); 

module.exports = mongoose.model('users', userSchema);
