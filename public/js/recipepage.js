var jsonData;
var rating = 1;
$(document).ready(function(){
  var url = "https://api.yummly.com/v1/api/recipe/" + req.query.id + "?_app_id=b96a6669&_app_key=68fc92d94c14efafd327d91916587827";
  $.getJSON(url, function(jsondata){
    rating = jsondata.rating;
  });
  console.log(rating);
  // document.getElementById("star1").style. = "";
})
