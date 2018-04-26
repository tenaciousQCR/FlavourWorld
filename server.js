//Server JavaScript
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/profiles";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const getJSON = require('get-json');//npm install get-json
const app = express();
app.use(express.static('public'))
var db;
app.set('views');


// THIS TELLS EXPRESS WE ARE USING SESSIONS. THESE ARE VARIABLES THAT ONLY BELONG TO ONE USER OF THE SITE AT A TIME

app.use(session({ secret: 'example' }));
app.use(bodyParser.urlencoded({
  extended: true
}))

// SET THE VIEW ENGINE TO EJS
app.set('view engine', 'ejs');
var db;


//------------------------------------------------------------------------------

MongoClient.connect(url, function(err, database){
 if(err) throw err;
 db = database;
 app.listen(8080);
 console.log('listening on 8080');
});


//THIS IS OUR ROOT ROUTE -- CODE GOES HERE FOR LOGGED-IN STUFF

app.get('/', function(req, res) {
// IF THE USER IS NOT LOGGED-IN, THIS REDIRECTS THEM TO THE home PAGE
  if(!req.session.loggedin){
    res.redirect('/home');
    return;
  }
});


//------------------------------------------------------------------------------


// LOGOUT ROUTE CAUSES THE PAGE TO LOGOUT
// IT SETS OUR session.loggedin TO FALSE AND THEN REDIRECTS THE USER TO THE LOGIN

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
      loggedin = true;
      req.session.currentusername = uname;
      console.log("you are logged in");
      res.redirect("/profile");
    }

    //otherwise send them back to login
    else{res.redirect('/loginPage')}
  });
});

//RENDER PAGES

app.get('/home', function(req, res) {
  res.render('pages/home', {loggedin: req.session.loggedin});

});

app.get('/about', function(req, res) {
  res.render('pages/about', {loggedin: req.session.loggedin});
});

app.get('/contact', function(req, res) {
  res.render('pages/contact', {loggedin: req.session.loggedin});
});

app.get('/legal', function(req, res) {
  res.render('pages/legal', {loggedin: req.session.loggedin});
});

app.get('/registerPage', function(req, res) {
  res.render('pages/registerPage', {loggedin: req.session.loggedin});
});

app.get('/loginPage', function(req, res) {
  res.render('pages/loginPage', {loggedin: req.session.loggedin});
});

app.get('/review', function(req, res) {
  res.render('pages/review', {
    id: req.query.id,
    name: req.query.name,
    loggedin: req.session.loggedin
  });
});

app.get('/profile', function(req, res) {
  var uname = req.session.currentusername;
  var reviews;
  var favourites;
  db.collection('reviews').find({"user": uname}).toArray(
    function(err, result){
      if(err) throw err;
      console.log(result);
      reviews = result;
    }
  );
  db.collection('favourites').find({"user": uname}).toArray(
    function(err, result){
      if(err) throw err;
      console.log(result);
      favourites = result;
    }
  );

  //console.log(reviews);
    db.collection('users').findOne({
      "login.username": uname
    },
    function(err, result) {
      if (err) throw err;
      console.log(result);

      //console.log(uname+ ":" + result);
      //finally we just send the result to the user page as "user"
      res.render('pages/profile', {
        user: result,
        reviews: reviews,
        favourites: favourites,
        loggedin: req.session.loggedin
      })
    });
});

app.get('/recipe', function(req, res){
  var url = "https://api.yummly.com/v1/api/recipe/" + req.query.id + "?_app_id=b96a6669&_app_key=68fc92d94c14efafd327d91916587827";
  var reviews;
  db.collection('reviews').find({"recipeID": req.query.id}).toArray(
    function(err, result){
      if(err) throw err;
      reviews = result;
    }
  );
  db.collection('favourites').findOne({"user": req.session.currentusername, "recipeID": req.query.id},
    function(err, result){
      if(err) throw err;
      console.log(result);
      favourites = result;
    }
  );
  getJSON(url, function(error, response){
    res.render('pages/recipe', {
      jsonData: response,
      reviews: reviews,
      favourites: favourites,
      id: req.query.id,
      loggedin: req.session.loggedin
    });
  });
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

app.get('/addfavourite', function(req, res){
  var datatostore = {"user":req.session.currentusername, "recipeID":req.query.id, "recipe": req.query.name};
  var redirectURL = "/recipe?id=" + req.query.id;
  db.collection('favourites').insertOne(datatostore, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect(redirectURL)
  })
});

app.get('/removefavourite', function(req, res){
  var datatoremove = {"user":req.session.currentusername, "recipeID":req.query.id, "recipe": req.query.name};
  var redirectURL = "/recipe?id=" + req.query.id;
  db.collection('favourites').removeOne(datatoremove, function(err, result) {
    if (err) throw err;
    console.log('removed from database')
    //when complete redirect to the index
    res.redirect(redirectURL)
  })
});

//------------------------------------------------------------------------------

function getRecipeJson(url){
  var json_obj;
    $.getJSON(url, function(jsonData){
      json_obj = jsonData;
    })
    return json_obj;
};

//------------------------------------------------------------------------------

app.post('/reviewDish', function(req, res) {
//we create the data string from the form components that have been passed in
//we need to find a way to pass in the dishname and the score
var redirectURL = "/recipe?id=" + req.body.id;
var datatostore = {
  "user":req.session.currentusername,
  "recipeID":req.body.id,
  "recipe":req.body.name,
  "score":req.body.score,
  "text":req.body.reviewbox}

//once created we just run the data string against the database and all our new data will be saved/
  db.collection('reviews').insertOne(datatostore, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect(redirectURL)
  })
});
