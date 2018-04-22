//initialise variables
var star11 = false;
var star12 = false;
var star13 = false;
var star14 = false;
var star15 = false;

var star21 = false;
var star22 = false;
var star23 = false;
var star24 = false;
var star25 = false;

var star31 = false;
var star32 = false;
var star33 = false;
var star34 = false;
var star35 = false;

var rating1 = 0;

var rating2 = 0;

var rating3 = 0;

function showStar() {

// STAR 11
 var x = $('#star1')

  if (star1) {
    rating = 1;
    $('#star1').attr("src", "images/star-filled-single.png");
  }
  else {
      $('#star1').attr("src", "images/star-empty-single.png");
  }

// STAR 12
  if (star2) {
    rating = 2;
    $('#star2').attr("src",  "images/star-filled-single.png");
  }
  else {
    $('#star2').attr("src", "images/star-empty-single.png");
  }

// STAR 13
  if (star3) {
    rating = 3;
    $('#star3').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star3').attr("src", "images/star-empty-single.png");
  }

// STAR 14
  if (star4) {
    rating = 4;
    $('#star4').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star4').attr("src", "images/star-empty-single.png");
  }

// STAR 15
  if (star5) {
    rating = 5;
    $('#star5').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star5').attr("src", "images/star-empty-single.png");
  }
}

// STAR 21

// STAR 22

// STAR 23

// STAR 24

// STAR 25

// STAR 31

// STAR 32

// STAR 33

// STAR 34

// STAR 35

$("#star1").click(function() {
  console.log("why tho?");
  star1 = true;
  star2 = false;
  star3 = false;
  star4 = false;
  star5 = false;
  showStar();
});

$("#star2").click(function() {
  star1 = true;
  star2 = true;
  star3 = false;
  star4 = false;
  star5 = false;
  showStar();
});

$("#star3").click(function() {
  star1 = true;
  star2 = true;
  star3 = true;
  star4 = false;
  star5 = false;
  showStar();
});

$("#star4").click(function() {
  star1 = true;
  star2 = true;
  star3 = true;
  star4 = true;
  star5 = false;
  showStar();
});

$("#star5").click(function() {
  star1 = true;
  star2 = true;
  star3 = true;
  star4 = true;
  star5 = true;
  showStar();
});



  $("#submitButton").click(function() {
    if (rating == 0){
      console.log("You didn't enter a rating yet");
    }
    else{
      //insert it to the database to store
      console.log("Rating submitted successfully.");
    }});
