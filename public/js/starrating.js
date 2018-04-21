//initialise variables
var star1 = false;
var star2 = false;
var star3 = false;
var star4 = false;
var star5 = false;

var rating = 0;

function showStar() {
  //star 1
  console.log("STAR MAN");
 var x = $('#star1')
  console.log(x);
  if (star1) {
    rating = 1;
    $('#star1').attr("src", "images/star-filled-single.png");
  }
  else {
      $('#star1').attr("src", "images/star-empty-single.png");
  }

//star2
  if (star2) {
    rating = 2;
    $('#star2').attr("src",  "images/star-filled-single.png");
  }
  else {
    $('#star2').attr("src", "images/star-empty-single.png");
  }

//star3
  if (star3) {
    rating = 3;
    $('#star3').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star3').attr("src", "images/star-empty-single.png");
  }

//star4
  if (star4) {
    rating = 4;
    $('#star4').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star4').attr("src", "images/star-empty-single.png");
  }

//star5
  if (star5) {
    rating = 5;
    $('#star5').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star5').attr("src", "images/star-empty-single.png");
  }
}
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
