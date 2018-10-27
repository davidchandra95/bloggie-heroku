const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: String,
   image: {type: String, default: 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png'},
   content: String,
   description: {type: String, default: '-'},
   tags: {type: Array, default:['#general']},
   isPublic: {type: Boolean, default: true},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);