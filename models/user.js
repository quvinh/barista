const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        trim: true,
        require: true
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)