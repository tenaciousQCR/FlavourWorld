//initialise variables
var star1 = false;
var star2 = false;
var star3 = false;
var star4 = false;
var star5 = false;

function showStar() {
  //star 1
  console.log("STAR MAN");
//  var x = document.getElementById("#star1").src;
  console.log(x);
  if (star1) {
    $('#star1').src = "images/star-filled-single.png";
  }
  else {
    $('#star1').src = "images/star-empty-single.png";
  }

//star2
  if (star2) {
    $('#star2').src = "images/star-filled-single.png";
  }
  else {
    $('#star2').src = "images/star-empty-single.png";
  }

//star3
  if (star3) {
    $('#star3').src = "images/star-filled-single.png";
  }
  else {
    $('#star3').src = "images/star-empty-single.png";
  }

//star4
  if (star4) {
    $('#star4').src = "images/star-filled-single.png";
  }
  else {
    $('#star4').src = "images/star-empty-single.png";
  }

//star5
  if (star5) {
    $('#star5').src = "images/star-filled-single.png";
  }
  else {
    $('#star5').src = "images/star-empty-single.png";
  }
}
$("#star1").click(function() {
  console.log("fuck you");
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
