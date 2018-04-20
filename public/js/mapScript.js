//set the map and initial coordinates
var geojson;
var popup = L.popup();
var mymap;
var jsondata;

//------------------------SYLISTIC CODE-------------------------------

//Applies the chosen styles to each of the country objects on the map
function style(feature) {
    return {
        fillColor: getColour(feature.properties.continent),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '7',
        fillOpacity: 0.7
    };
}

//The associated colours with continents
function getColour(continent) {
    return continent == "North America" ? '#ff0000' :
           continent == "South America"  ? '#179a13' :
           continent == "Asia"  ? '#ffce01' :
           continent == "Europe"  ? '#3e76ec' :
           continent == "Africa"   ? '#E59400' :
           continent == "Oceania"   ? '#800080' :
                      '#808080';
}

//When clicked, the country chosen will be highlighted
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

//Unhighlights a feature when clicked off
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

//---------------------------POPUP CODE-----------------------------------

//Called when a country is clicked, finds the country that is clicked and passes it to the next function
function popupFeature(e){
    var targetcountry = e.target.feature.properties.name;
    getResultsFromYummly(targetcountry, e);

}

//Uses the country name to search the Yummly API for recipes and then initiates the popup
function getResultsFromYummly(targetcountry, e){
  var url = "https://api.yummly.com/v1/api/recipes?_app_id=b96a6669&_app_key=68fc92d94c14efafd327d91916587827&q=" + targetcountry;
  $.getJSON(url, function(jsondata){
    jsondata = jsondata;
    var htmlstring = addResultTitles(jsondata, e);
    popup
        .setLatLng(e.latlng)
        .setContent(htmlstring)
        .openOn(mymap);
  });
}

//Adds the found recipes from the JSON file to an HTML string and returns it
function addResultTitles(jsondata, e){
  var htmlstring = "<h1>" + e.target.feature.properties.name + "</h1>";
  var length = jsondata.matches.length;

  for (var i = 0; i < length; i++){
    var title = jsondata.matches[i].recipeName;
    htmlstring += "<button id=\"" + jsondata.matches[i].id + "\" onclick=\"getRecipe(this)\">" + title + "</button>";
  }
  return htmlstring;

}

function getRecipe(button){
  var recipe = button.id;
  console.log("It ran " + recipe);
  $.ajax({
        type: 'POST',
        url: '/recipe',
        data:{'recipe': recipe},
        success: function() {
            window.console.log('Success');
        },
        error: function(){
          window.console.log('Failure');
        }
    });

  // $.post("/recipe",
  // {
  //   recipe: "recipe"
  // }).done(function(data){
  //   alert("This sent data I think " + data);
  // });
};
//
// function popupFeature(e){
//     var countryname = e.target.feature.properties.name;
//     popup
//         .setLatLng(e.latlng)
//         .setContent('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="popup.css"></head><body id=\'popupBody\'><h1>Recipes</h1><div id=\'popupDiv\'><ol id= \'popupList\'><li>' + countryname + '</li><li><link>Item2</link></li><li><link>Item3</link></li></ol></div></body></html>')
//         .openOn(mymap);
// }





//----------------------------CREATING AND POPULATING MAP---------------------------------

//adds functionality to each feature on the map
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: popupFeature,
    });
}

//initiates and populates the map
$.getJSON('../js/custom.geo.json',function(data){
            mymap = L.map('mapid').setMinZoom(2).setMaxBounds([[90,180], [-90,-179]]).setView([32,-35], 3);
            var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });

            Esri_WorldGrayCanvas.addTo(mymap);

            geojson = L.geoJson(data, {style: style, onEachFeature: onEachFeature}).addTo(mymap);
})

// var mymap = L.map('mapid').setView([32,-35], 3);
// var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });
//
// Esri_WorldGrayCanvas.addTo(mymap);
