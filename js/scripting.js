var menuToggled = false;
var height = $(window).height();


$(function(){
    if($(window).width() < 765){
      menu_toggle();
    }
});

$( window ).resize(function() {
  if($(window).width() > 765 && menuToggled){
    menu_toggle();
  }
});

$( window ).resize(function() {
  if($(window).width() < 765 && !menuToggled){
    menu_toggle();
  }
});



$( window ).resize(function() {
  if($(window).height() != height && $(window).width() < 765){
    main_resize();
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
var windowHeight;

function main_resize(){
  windowHeight = $(window).height();
  console.log(windowHeight);
  document.getElementById('Page').style.height= windowHeight*3 + 'px';
}

/*
    if($("#mapContainer").hasClass("grid-70")){
      $("#mapContainer").removeClass("mapContainer grid-70 mobile-grid-100");
      $("#mapContainer").addClass("mapContainer grid-100 mobile-grid-100");
    }
    else if($("#mapContainer").hasClass("mapContainer grid-100 mobile-grid-100")){
      $("#mapContainer").addClass("mapContainer grid-70 mobile-grid-100");
      $("#mapContainer").removeClass("mapContainer grid-100 mobile-grid-100");
    }



};
*/
// $.getJSON('../js/custom.geo.json',function(data){
//             var mymap = L.map('mapid').setView([32,-35], 3);
//             var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });
//
//             Esri_WorldGrayCanvas.addTo(mymap);
//
//             L.geoJson(data).addTo(map);
// })

var mymap = L.map('mapid').setView([32,-35], 3);
var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });

Esri_WorldGrayCanvas.addTo(mymap);

mymap.setMinZoom(2);

mymap.setMaxBounds([[90,180], [-90,-179]])
