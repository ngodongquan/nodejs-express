var mongoose = require('mongoose')

const listUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 64,
        minLength:3
    },
    username: {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 2,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 2
    },
    password: {
        type: String,
        required: true,
        maxLength: 12,
        minLength: 6,
    },
    birthday : {
        type: Date,
    },
    avatarUrl: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
})

var listUser = mongoose.model('ListUser', listUserSchema, 'user')

module.exports = listUser