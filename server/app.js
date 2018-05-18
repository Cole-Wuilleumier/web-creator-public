var express = require('express');
var app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'))

var db = require('./db');

app.get('/hello', (req, res)=>{
  res.sendfile(__dirname+'/public/webpages/hello.html');
});


//User Controller
var UserController = require('./controllers/user/UserController');
app.use('/api/users', UserController);


//Profiles Controller
var ProfileController = require('./controllers/profile/ProfileController');
app.use('/api/profiles', ProfileController);

//Webpages Controller
var WebpageController = require('./controllers/webpage/WebpageController');
app.use('/api/webpages', WebpageController);


//Authentication Controller( login, logout, signup, verifyToken )
var AuthController = require('./controllers/auth/AuthController');
app.use('/api/auth', AuthController);


module.exports = app;