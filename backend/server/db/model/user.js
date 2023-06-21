const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        minLength: 3,
        maxLength: 40,
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        minLength: 3,
        maxLength: 40,
    },
    email: {
        type: String,
        required: [true, "Please enter email address"],
        minLength: 3,
        maxLength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: [true, "This account already exists"],
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [8, "Please enter minimum 8 characters"],
    },
    type: {
        type: String,
        required: [true, "Please add type of user"]
    }
});

userSchema.pre('save', async function () {
    const randomBytes = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, randomBytes)
})

userSchema.methods.matchPassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

userSchema.methods.createJWT = async function () {
    return jwt.sign(
        { userId: this._id, name: this.firstName },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME, }
    )
}

module.exports = mongoose.model('User', userSchema);