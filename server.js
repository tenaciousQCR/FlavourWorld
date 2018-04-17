//User database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/users";
const express = require('express');
const app = express();
app.use(express.static('public'))
var db;

MongoClient.connect(url, function(err, database){
 if(err) throw err;
 db = database;
 app.listen(8080);
});


//this is our root route -- code goes here for logged in stuff
app.get('/', function(req, res) {
  //if the user is not logged in redirect them to the login page
  if(!req.session.loggedin){
    //res.redirect('/loginPage');
    return;
  }


});



app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.uname;
  var pword = req.body.psw;

  db.collection('users').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('/loginPage');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){ req.session.loggedin = true; res.redirect('/') }
    //otherwise send them back to login
    else{res.redirect('/loginPage')}
  });
});

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
    res.redirect('/')
  })
});
