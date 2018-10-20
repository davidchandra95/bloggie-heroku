const express = require('express');
const router = express.Router();
const Post = require('../models/post');
//const middleware = require('../middleware')

router.get('/', (req, res) => {
   Post.find({}, (err, posts) => {
      if (err) return res.send({message: 'aw snap! index' + err});

      res.render('./post/index', {posts});
   });
});

router.get('/new', (req, res) => {
   res.render('./post/new');
})

// PUT AFTER /NEW ROUTE TO PREVENT NEW BEING READ AS AN ID
router.get('/:id', (req, res) => {
   let id = req.params.id;
   Post.findById(id, (err, post) => {
      if (err) {
         console.log('Error ' + err);
      } else {
         res.render('./post/detail', { post });
      }
   });
});

router.get('/:id/edit', (req, res) => {
   Post.findById(req.params.id, (err, post) => {
      if (err) return res.send({message: 'aw snap! ' + err});

      res.render('post/edit', { post });
   });
});

router.put('/:id', (req, res) => {
   Post.findByIdAndUpdate(req.params.id, req.body.post, (err, post) => {
      if (err) return res.send({message: 'aw snap! ' + err});

      res.redirect('/post/' + post._id);
   });
});

router.delete('/:id', (req, res) => {
   Post.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.send({message: 'aw snap! ' + err});

      res.redirect('/post');
   });
});

module.exports = router;