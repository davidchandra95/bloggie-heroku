const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   email: String,
   username: String,
   password: String
}, {timestamps: true});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);