//initialise variables
var star1 = false;
var star2 = false;
var star3 = false;
var star4 = false;
var star5 = false;

var rating = 0;

function showStar() {

// STAR 11
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
};

// RATING FUNCTIONS: TASTE

  $("#star1").click(function() {
    console.log("why tho?");
    document.getElementById('starrating').value = 1;
    star1 = true;
    star2 = false;
    star3 = false;
    star4 = false;
    star5 = false;
    showStar();
  });

  $("#star2").click(function() {
    document.getElementById('starrating').value = 2;
    star1 = true;
    star2 = true;
    star3 = false;
    star4 = false;
    star5 = false;
    showStar();
  });

  $("#star3").click(function() {
    document.getElementById('starrating').value = 3;
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = false;
    star5 = false;
    showStar();
  });

  $("#star4").click(function() {
    document.getElementById('starrating').value = 4;
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = false;
    showStar();
  });

  $("#star5").click(function() {
    document.getElementById('starrating').value = 5;
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
