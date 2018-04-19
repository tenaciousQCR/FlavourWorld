//User database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/users";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();
app.use(express.static('public'))
var db;

app.set('views', __dirname + '/public');

//this tells express we are using sesssions. These are variables that only belong to one user of the site at a time.
app.use(session({ secret: 'example' }));
app.use(bodyParser.urlencoded({
  extended: true
}))
// set the view engine to ejs
app.set('view engine', 'ejs');
var db;

//------------------------------------------------------------------------------

MongoClient.connect(url, function(err, database){
 if(err) throw err;
 db = database;
 app.listen(8080);
 console.log('listening on 8080');
});


//this is our root route -- code goes here for logged in stuff
app.get('/', function(req, res) {
  //if the user is not logged in redirect them to the login page
  if(!req.session.loggedin){
    res.redirect('/home');
    return;
  }
});

//------------------------------------------------------------------------------

//logour route cause the page to Logout.
//it sets our session.loggedin to false and then redirects the user to the login
app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/');
});

//------------------------------------------------------------------------------

app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.uname;
  var pword = req.body.psw;

  db.collection('users').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){
      res.redirect('/loginPage');
      console.log("you are not logged in");
      return
    }

    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      req.session.loggedin = true;
      console.log("you are logged in");
      res.redirect('/')
    }

    //otherwise send them back to login
    else{
      console.log("you are damned");
      res.redirect('/loginPage')
    }
  });
});

//Render pages
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/home', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.get('/recipe-1', function(req, res) {
  res.render('recipe-1');
});

app.get('/recipe-2', function(req, res) {
  res.render('recipe-2');
});

app.get('/recipe-3', function(req, res) {
  res.render('recipe-3');
});

app.get('/legal', function(req, res) {
  res.render('legal');
});

app.get('/registerPage', function(req, res) {
  res.render('registerPage');
});

app.get('/loginPage', function(req, res) {
  res.render('loginPage');
});

//------------------------------------------------------------------------------

app.post('/registeruser', function(req, res) {
  //check we are logged in
  //if(!req.session.loggedin){res.redirect('/login');return;}

  //we create the data string from the form components that have been passed in

var datatostore = {
"name":{"first":req.body.fname,"last":req.body.lname},
"email":req.body.email,
"login":{"username":req.body.street, "password":req.body.password}}

//once created we just run the data string against the database and all our new data will be saved/
  db.collection('users').save(datatostore, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/loginPage')
  })
});
