const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email id');
            }
        }
    },
    number: {
        type: Number,
        required: true,
        minlength: 10
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // confirmpassword: {
    //     type: String,
    //     required: true,
    // },
    message: {
        type: String,
        required: true,
        minlength: 3
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;