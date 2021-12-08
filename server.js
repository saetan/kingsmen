// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/users');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = process.env.PORT;

const mongoURI = process.env.MONGO_URI;
// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// static files middleware
app.use(express.static('public'));

//Method Overidde middleware
app.use(methodOverride("_method"));

// Session middleware
app.use(session({
  secret: "feedmeseymour", //some random string
  resave: false,
  saveUninitialized: false
}));

// USER CONTROLLERS
const userController = require('./controllers/userController.js');
app.use('/users', userController);
// CONTROLLERS
// fitting room three
const roomController = require('./controllers/room.js');
app.use('/room', roomController);

// session controllers
const sessionController = require('./controllers/sessionController.js');
app.use('/sessions', sessionController);

// GET INDEX
app.get('/', (req, res) => {
  console.log(req.session);
  console.log(req.session.user);
  const agent = req.session.user;
  res.render('index.ejs', { agent: agent });
});


// SEED ROUTE
// NOTE: Do NOT run this route until AFTER you have a create user route up and running, as well as encryption working!
const seed = require('./models/seed.js');

app.get('/seedAgents', async (req, res) => {
  // encrypts the given seed passwords
  console.log(seed);
  seed.forEach((user) => {
    console.log(user);
    user.password = bcrypt.hashSync(user.password, 10);
  });
  console.log(seed);
  // seeds the data
  await User.create(seed, (err, createdUsers) => {
    // logs created users
    console.log(createdUsers);
    // redirects to index
    res.redirect('/');
  });
});

// CONNECTIONS
app.listen(port, () => {
  console.log('listening on port: ', port);
});

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
