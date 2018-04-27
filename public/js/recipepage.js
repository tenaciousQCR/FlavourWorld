var jsonData;
var rating = 0;
var star1 = false;
var star2 = false;
var star3 = false;
var star4 = false;
var star5 = false;

$(document).ready(function(){
  console.log(score.attr("score"));
  getRating();
  showStar();
  console.log(rating);
  // document.getElementById("star1").style. = "";
})

function getRating(){
  rating = document.getElementById('score').value;
  if(rating == 5){
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = true;
  }

  else if(rating == 4){
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = true;
    star5 = false;
  }

  else if(rating == 3){
    star1 = true;
    star2 = true;
    star3 = true;
    star4 = false;
    star5 = false;
  }

  else if(rating == 2){
    star1 = true;
    star2 = true;
    star3 = false;
    star4 = false;
    star5 = false;
  }

  else if(rating == 1){
    star1 = true;
    star2 = false;
    star3 = false;
    star4 = false;
    star5 = false;
  }

  else{
    star1 = false;
    star2 = false;
    star3 = false;
    star4 = false;
    star5 = false;
  }
}




function showStar() {
// STAR 1
  if (star1) {
    $('#star1').attr("src", "images/star-filled-single.png");
  }
  else {
      $('#star1').attr("src", "images/star-empty-single.png");
  }

// STAR 2
  if (star2) {
    $('#star2').attr("src",  "images/star-filled-single.png");
  }
  else {
    $('#star2').attr("src", "images/star-empty-single.png");
  }

// STAR 3
  if (star3) {
    $('#star3').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star3').attr("src", "images/star-empty-single.png");
  }

// STAR 4
  if (star4) {
    $('#star4').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star4').attr("src", "images/star-empty-single.png");
  }

// STAR 5
  if (star5) {
    $('#star5').attr("src", "images/star-filled-single.png");
  }
  else {
    $('#star5').attr("src", "images/star-empty-single.png");
  }
};
