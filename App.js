const express = require ('express');
const favicon = require('serve-favicon');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const path = require('path');

const User = require('./models/user');
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/post');
const methodOverride = require('method-override');
const flash = require('connect-flash');

mongoose.connect('mongodb://jastin:jastin10@ds133338.mlab.com:33338/db-bloggie');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(favicon('favicon.ico')); 
app.use(methodOverride("_method"));
app.use(flash());
app.use(require('express-session')({
   secret: 'dubidapap',
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// CURRENT USER MIDDLEWARE
app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash('error');
   res.locals.success = req.flash('success');

   next();
});
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(indexRoutes);
app.use('/post', postRoutes);

app.listen(3000 || process.env.PORT, process.env.IP, () => {
   console.log("Bloggie is running..");
});