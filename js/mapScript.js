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
    popup
        .setLatLng(e.latlng)
        .setContent('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../css/popup.css"></head><body id=\'popupBody\'><h1>Recipes</h1><div id=\'popupDiv\'><ol id= \'popupList\'><li><a href="recipe-1.html"><button>Pigs in Blanket</button></a></li><li><a href="recipe-2.html"><button>Goulash</button></a></li><li><a href="recipe-3.html"><button>Cacio e Pepe</button></a></li></ol></div></body></html>')
        .openOn(mymap);
}



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
