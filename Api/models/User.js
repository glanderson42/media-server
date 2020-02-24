'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required'
    }, 
    password: {
        type: String,
        required: 'Password is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Users', UserSchema);