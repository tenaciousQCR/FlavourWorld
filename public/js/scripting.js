var menuToggled = false;
var height = $(window).height();
var loginMenu = false;


$(function(){
    if($(window).width() < 1024){
      menu_toggle();
    }
    //
});

$( window ).resize(function() {
  if($(window).width() > 1024 && menuToggled){
    menu_toggle();
  }
});

$( window ).resize(function() {
  if($(window).width() < 1024 && !menuToggled){
    menu_toggle();
  }
});



$( window ).resize(function() {
  if($(window).height() != height && $(window).width() < 1024){
    //
    height = $(window).height();
  }
});


function menu_toggle(){
    $("#sidebar").animate({width: "toggle", height: "toggle"}, 50);
    if(menuToggled){
      menuToggled = false;
    }
    else{
      menuToggled = true;
    }
}

$( ".profileMenu" ).hover(
  function() {

  }, function() {
    $( ".profileMenu" ).hide();
  }
);


function login_menu(){
  if(!loginMenu){
      $(".profileMenu").css("display", "block");
      loginMenu = true;
    }
    else{
      $(".profileMenu").css("display", "none");
      loginMenu=false;
    }
}

var windowHeight;
//
// function main_resize(){
//   windowHeight = $(window).height();
//   document.getElementById('Page').style.height= auto;
// }

    // if($("#mapContainer").hasClass("grid-70")){
    //   $("#mapContainer").removeClass("mapContainer grid-70 mobile-grid-100");
    //   $("#mapContainer").addClass("mapContainer grid-100 mobile-grid-100");
    // }
    // else if($("#mapContainer").hasClass("mapContainer grid-100 mobile-grid-100")){
    //   $("#mapContainer").addClass("mapContainer grid-70 mobile-grid-100");
    //   $("#mapContainer").removeClass("mapContainer grid-100 mobile-grid-100");
    // }
