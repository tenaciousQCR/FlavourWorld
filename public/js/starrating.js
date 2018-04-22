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
  if (star11) {
    rating = 1;
    $('#star11').attr("src", "images/star-filled-single.png");
  }
  else {
      $('#star11').attr("src", "images/star-empty-single.png");
  }

// STAR 12
  if (star12) {
    rating = 2;
    $('#star12').attr("src",  "images/star-filled-single.png");
  }
  else {
    $('#star12').attr("src", "images/star-empty-single.png");
  }

// STAR 13
  if (star13) {
    rating = 3;
    $('#star13').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star13').attr("src", "images/star-empty-single.png");
  }

// STAR 14
  if (star14) {
    rating = 4;
    $('#star14').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star14').attr("src", "images/star-empty-single.png");
  }

// STAR 15
  if (star15) {
    rating = 5;
    $('#star15').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star15').attr("src", "images/star-empty-single.png");
  }

// STAR 21
  if (star21) {
    rating = 5;
    $('#star21').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star21').attr("src", "images/star-empty-single.png");
  }

// STAR 22
  if (star22) {
    rating = 5;
    $('#star22').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star22').attr("src", "images/star-empty-single.png");
  }

// STAR 23
  if (star23) {
    rating = 5;
    $('#star23').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star23').attr("src", "images/star-empty-single.png");
  }

// STAR 24
  if (star24) {
    rating = 5;
    $('#star24').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star24').attr("src", "images/star-empty-single.png");
  }

// STAR 25
  if (star25) {
    rating = 5;
    $('#star25').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star25').attr("src", "images/star-empty-single.png");
  }

// STAR 31
  if (star31) {
    rating = 5;
    $('#star31').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star31').attr("src", "images/star-empty-single.png");
  }

// STAR 32
  if (star32) {
    rating = 5;
    $('#star32').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star32').attr("src", "images/star-empty-single.png");
  }

// STAR 33
  if (star33) {
    rating = 5;
    $('#star33').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star33').attr("src", "images/star-empty-single.png");
  }

// STAR 34
  if (star34) {
    rating = 5;
    $('#star34').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star34').attr("src", "images/star-empty-single.png");
  }

// STAR 35
  if (star35) {
    rating = 5;
    $('#star35').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star35').attr("src", "images/star-empty-single.png");
  }
}


// RATING FUNCTIONS: TASTE

  $("#star11").click(function() {
    console.log("why tho?");
    star1 = true;
    star2 = false;
    star3 = false;
    star4 = false;
    star5 = false;
    showStar();
  });

  $("#star12").click(function() {
    star1 = true;
    star2 = true;
    star3 = false;
    star4 = false;
    star5 = false;
    showStar();
  });

  $("#star13").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = false;
    star5 = false;
    showStar();
  });

  $("#star14").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = false;
    showStar();
  });

  $("#star15").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });


// RATING FUNCTIONS: COST

  $("#star21").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star22").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star23").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star24").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star25").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });


// RATING FUNCTIONS: PREPARATION

  $("#star31").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star32").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star33").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star34").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });

  $("#star35").click(function() {
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
    showStar();
  });


// SUBMIT BUTTON

  $("#submitButton").click(function() {
    if (rating == 0){
      console.log("You didn't enter any rating yet");
    }
    else{
      //insert it to the database to store
      console.log("Rating submitted successfully");
    }
  });
