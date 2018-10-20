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
});

module.exports = mongoose.model('Post', postSchema);