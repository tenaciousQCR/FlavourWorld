//set the map and initial coordinates
var geojson;
var popup = L.popup();
var mymap;

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

function getColour(continent) {
    return continent == "North America" ? '#ff0000' :
           continent == "South America"  ? '#179a13' :
           continent == "Asia"  ? '#ffce01' :
           continent == "Europe"  ? '#3e76ec' :
           continent == "Africa"   ? '#E59400' :
           continent == "Oceania"   ? '#800080' :
                      '#808080';
}

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

function popupFeature(e){
    console.log("Clicked");
    var targetcountry = e.target.feature.properties.name;
    function getResultsFromYummly(targetcountry){
      var url = "https://api.yummly.com/v1/api/recipes?_app_id=b96a6669&_app_key=68fc92d94c14efafd327d91916587827&q=" + searchterms;
      $.getJSON(url, function(jsondata){
        var htmlstring = addResultTitles(jsondata, e);
        console.log(htmlstring);
        popup
            .setLatLng(e.latlng)
            .setContent(htmlstring)
            .openOn(mymap);
      });
    }

}

function addResultTitles(jsondata, e){
  var htmlstring = "";
  var length = jsondata.matches.length;

  for (var i = 0; i < length; i++){
    var title = jsondata.matches[i].recipeName;
    console.log(title);
    htmlstring += "<li>" + title + "</li>";
  }
  return htmlstring;

}
//
// function popupFeature(e){
//     var countryname = e.target.feature.properties.name;
//     popup
//         .setLatLng(e.latlng)
//         .setContent('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="popup.css"></head><body id=\'popupBody\'><h1>Recipes</h1><div id=\'popupDiv\'><ol id= \'popupList\'><li>' + countryname + '</li><li><link>Item2</link></li><li><link>Item3</link></li></ol></div></body></html>')
//         .openOn(mymap);
// }



function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: popupFeature,
    });
}



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
