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

//Connects to the mongo database and then enables the server
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

//Enables user log in
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

//RENDER PAGES ROUTES -----------------------------------------------------------

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

//Brings user to the review page, brings id and name of recipe for database entry
app.get('/review', function(req, res) {
  res.render('pages/review', {
    id: req.query.id,
    name: req.query.name,
    loggedin: req.session.loggedin
  });
});

//Brings the user to the profile page. Checks database for users favourites and reviews to display them.
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

//Generates recipe page based on yummly api. Pulls in relevant recipes and checks if the current user has favourited and/or reviewed the recipe
app.get('/recipe', function(req, res){
  var url = "https://api.yummly.com/v1/api/recipe/" + req.query.id + "?_app_id=b96a6669&_app_key=68fc92d94c14efafd327d91916587827";
  var reviews;
  var userreviews;
  db.collection('reviews').find({"recipeID": req.query.id}).toArray(
    function(err, result){
      if(err) throw err;
      reviews = result;
    }
  );
  db.collection('favourites').findOne({"user": req.session.currentusername, "recipeID": req.query.id},
    function(err, result){
      if(err) throw err;
      favourites = result;
    }
  );
  //Finds the review made by the current user
  db.collection('reviews').findOne({"user": req.session.currentusername, "recipeID": req.query.id},
    function(err, result){
      if(err) throw err;
      userreviews = result;
    }
  );
  getJSON(url, function(error, response){
    res.render('pages/recipe', {
      jsonData: response,
      score: response.rating,
      reviews: reviews,
      favourites: favourites,
      userreviews: userreviews,
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

//Adds a favourite recipe to the database with the current user and recipe
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

//Removes a favourite recipe from the database based on the current user and recipe
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

//Allows for the user to delete a review they have made. Accessed from the recipe page that the review was for
app.get('/deletereview', function(req, res){
  var datatoremove = {"user":req.session.currentusername, "recipeID":req.query.id, "recipe": req.query.name};
  var redirectURL = "/recipe?id=" + req.query.id;
  db.collection('reviews').removeOne(datatoremove, function(err, result) {
    if (err) throw err;
    console.log('removed from database')
    //when complete redirect to the index
    res.redirect(redirectURL)
  })
});

//------------------------------------------------------------------------------

// function getRecipeJson(url){
//   var json_obj;
//     $.getJSON(url, function(jsonData){
//       json_obj = jsonData;
//     })
//     return json_obj;
// };

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
