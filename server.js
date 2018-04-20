//User database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/profiles";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();
app.use(express.static('public'))
var db;

app.set('views');

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
      return
    }

    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      req.session.loggedin = true;
      console.log("you are logged in");
      res.redirect("/home");
    }

    //otherwise send them back to login
    else{res.redirect('/loginPage')}
  });
});


//Render pages
app.get('/home', function(req, res) {
  res.render('pages/home');
});

app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.get('/contact', function(req, res) {
  res.render('pages/contact');
});

app.get('/recipe-1', function(req, res) {
  res.render('pages/recipe-1');
});

app.get('/recipe-2', function(req, res) {
  res.render('pages/recipe-2');
});

app.get('/recipe-3', function(req, res) {
  res.render('pages/recipe-3');
});

app.get('/legal', function(req, res) {
  res.render('pages/legal');
});

app.get('/registerPage', function(req, res) {
  res.render('pages/registerPage');
});

app.get('/loginPage', function(req, res) {
  res.render('pages/loginPage');
});

app.post('/findrecipeinfo', function(req, res){
  var url = "https://api.yummly.com/v1/api/recipe/" + req.body.recipe + "?_app_id=b96a6669&_app_key=68fc92d94c14efafd327d91916587827"
  console.log(url);
  res.redirect('/recipe?id=' + req.body.id);
})

app.get('/recipe', function(req, res){
  console.log(req.query.id)
  res.render('pages/recipe');
})

//------------------------------------------------------------------------------

app.post('/registeruser', function(req, res) {
  //check we are logged in
  //if(!req.session.loggedin){res.redirect('/login');return;}

  //we create the data string from the form components that have been passed in

var datatostore = {
"name":{"first":req.body.fname,"last":req.body.lname},
"email":req.body.email,
"login":{"username":req.body.uname, "password":req.body.psw}}

//once created we just run the data string against the database and all our new data will be saved/
  db.collection('users').insertOne(datatostore, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/loginPage')
  })
});
