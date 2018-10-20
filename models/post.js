const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: String,
   body: String,
   tags: {type: Array, default:[]},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);