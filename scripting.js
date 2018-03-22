// $(function(){
//     $("#sidebar").animate({width: "toggle"}, 1);
// });
//
// function menu_toggle(){
//
//     $("#sidebar").animate({width: "toggle", height: "toggle"}, 200);

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
// $.getJSON('custom.geo.json',function(data){
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
