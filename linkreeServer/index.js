const express = require("express"); // INIT MTA3 EL EXPRESS
const bodyParser = require("body-parser"); // PACKAGE BCH TEJJEM T3AYET LELE CONTENT MTA3 EL BODY B REQ.BODY
const app = express(); // LANCINA EL EXPRESS
let http = require('http').Server(app); // SNA3NA SERVER WEB BL HTTP
const session = require('express-session'); 
const flash = require('connect-flash'); 
const cors = require('cors'); // Import the CORS middleware
const mongoose = require('mongoose');
const passport = require('passport');
const userRoute = require('./routes/user');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend application
  methods: ['GET', 'POST'], // Specify the methods you want to allow
  credentials: true // Enable to allow cookies to be sent with requests
}));



mongoose.connect('mongodb://127.0.0.1:27017/linktree', {  // BADLOU BESM EL BASE DE DONNEE
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secret = "SiteAmira";

const sessionConfig = session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days in milliseconds
  }
});

app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, User.authenticate()));


app.use(flash());
app.use(express.static('public')); // T9OLOU ENOU EL JS , CSS , IMAGES ikounou fl dossier public

const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/api', userRoute);

http.listen(3001, () => {
  console.log('Server listening on port 3001');
});
