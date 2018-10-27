const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const middleware = require('../middleware')

function formatDate(date) {
   var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
   ];

   var day = date.getDate();
   var monthIndex = date.getMonth();
   var year = date.getFullYear();

   return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

router.get('/', (req, res) => {
   Post.find({isPublic: true}, (err, posts) => {
      if (err) return res.send({ message: 'aw snap! index' + err });

      posts.forEach((post, i) => {
         posts[i]['displayDate'] = formatDate(post.createdAt)
      });
      res.render('./post/index', { posts });
   });
});

router.post('/', middleware.isLoggedIn, function (req, res) {
   var author = {
      id: req.user._id,
      username: req.user.username
   }

   var post = {
      title: req.body.title,
      image: req.body.image,
      content: req.body.content,
      tags: req.body.tags,
      description: req.body.descripition,
      isPublic: req.body.isPublic == 'on' ? true : false,
      author: author
   };

   Post.create(
      post, (err, post) => {
         if (err) {
            console.log(err);
         } else {

         }
      });

   res.redirect('/post');
});

router.get('/new', middleware.isLoggedIn, (req, res) => {
   res.render('./post/new');
})

// PUT AFTER /NEW ROUTE TO PREVENT NEW BEING READ AS AN ID
router.get('/:id', (req, res) => {
   let id = req.params.id;
   Post.findById(id, (err, post) => {
      if (err) {
         console.log('Error ' + err);
      } else {
         post['displayDate'] = formatDate(post.createdAt)
         res.render('./post/detail', { post });
      }
   });
});

router.get('/:id/edit', (req, res) => {
   Post.findById(req.params.id, (err, post) => {
      if (err) return res.send({ message: 'aw snap! ' + err });

      res.render('post/edit', { post });
   });
});

router.put('/:id', (req, res) => {
   Post.findByIdAndUpdate(req.params.id, req.body.post, (err, post) => {
      if (err) return res.send({ message: 'aw snap! ' + err });

      res.redirect('/post/' + post._id);
   });
});

router.delete('/:id', (req, res) => {
   Post.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.send({ message: 'aw snap! ' + err });

      res.redirect('/post');
   });
});

module.exports = router;