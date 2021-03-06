//set the map and initial coordinates
var geojson;
var popup = L.popup();
var mymap;
var jsondata;
//dietary restrictions
var gluten = true;
var dairy = true;
var egg = true;
var fish = true;
var soy = true;
var sesame = true;
var nuts = true;
//time restrictions
var breakfast = true;
var lunch = true;
var dinner = true;
var snack = true;
//Diet
var vegetarian = false;
var vegan = false;
var pescetarian = false;


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

//Emulates a map click for the searchbar to work
function clickOnMapItem(name){
  var layers = geojson.getLayers();
  layers.forEach(function(layer){
    if(layer._leaflet_id == name){
      layer.latln = layer._bounds._northEast;
      layer.fireEvent('click');
    };
  });
}

//Called when a country is clicked, finds the country that is clicked and passes it to the next function
function popupFeature(e){
    var targetcountry = e.target.feature.properties.name;
    getResultsFromYummly(targetcountry, e);

}

//Uses the country name to search the Yummly API for recipes and then initiates the popup
function getResultsFromYummly(targetcountry, e){
  var url = "https://api.yummly.com/v1/api/recipes?_app_id=b96a6669&_app_key=68fc92d94c14efafd327d91916587827&q=" + countryfilter(targetcountry) + filters();
  $.getJSON(url, function(jsondata){
    jsondata = jsondata;
    var htmlstring = addResultTitles(jsondata, e);
    popup
        .setLatLng(getLatLng(e))
        .setContent(htmlstring)
        .openOn(mymap);
  });
}

//Adds the found recipes from the JSON file to an HTML string and returns it
function addResultTitles(jsondata, e){
  var htmlstring = "<h1>" + e.target.feature.properties.name + "</h1><ul>";
  var length = jsondata.matches.length;

  for (var i = 0; i < length; i++){
    var title = jsondata.matches[i].recipeName;
    htmlstring += "<li><a href=\"/recipe?id=" + jsondata.matches[i].id + "\">" + title + "</a></li>";
  }
  htmlstring += "</ul>"
  return htmlstring;

}

//Determines the latlng of the popup based on whether it was searched or clicked on the map
function getLatLng(e){
  if(e.latlng == undefined){
    var lat = (e.target._bounds._northEast.lat + e.target._bounds._southWest.lat)/2;
    var lng = (e.target._bounds._northEast.lng + e.target._bounds._southWest.lng)/2;
    return {lat,lng};
  }
  else{
    return e.latlng
  }
}

//------------------------------------Filters-------------------------------------

//Adds the filters to the API request based on those selected
function filters(){
  var filterString = "";

  //ALLERGENS----------------------------------------------

  if(!gluten){
    filterString += "&allowedAllergy[]=393^Gluten-Free"
  }
  if(!dairy){
    filterString += "&allowedAllergy[]=396^Dairy-Free"
  }
  if(!egg){
    filterString += "&allowedAllergy[]=397^Egg-Free"
  }
  if(!fish){
    filterString += "&allowedAllergy[]=398^Seafood-Free"
  }
  if(!soy){
    filterString += "&allowedAllergy[]=400^Soy-Free"
  }
  if(!sesame){
    filterString += "&allowedAllergy[]=399^Sesame-Free"
  }
  if(!nuts){
    filterString += "&allowedAllergy[]=394^Peanut-Free"
  }
  //TIME RESTRICTIONS---------------------------------------
  if(!breakfast){
    filterString += "&allowedCourse[]=course^course-Breakfast and Brunch";
  }
  if(!lunch){
    filterString += "&allowedCourse[]=course^course-Lunch";
  }
  if(!dinner){
    filterString += "&allowedCourse[]=course^course-Main Dishes";
  }
  if(!snack){
    filterString += "&allowedCourse[]=course^course-Snacks";
  }
  //DIET--------------------------------------------------------
  if(vegetarian){
    filterString += "&allowedDiet[]=387^Lacto-ovo vegetarian"
  }
  if(vegan){
    filterString += "&allowedDiet[]=386^Vegan"
  }
  if(pescetarian){
    filterString += "&allowedDiet[]=390^Pescetarian"
  }

  return filterString
}

//Enables or Disables filters when the button is clicked
function setFilter(button){
  //ALLERGENS
  if(button == "gluten"){
    gluten = !gluten;
    if(gluten){
      document.getElementById("gluten").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("gluten").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "dairy"){
    dairy = !dairy;
    if(dairy){
      document.getElementById("dairy").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("dairy").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "egg"){
    egg = !egg;
    if(egg){
      document.getElementById("egg").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("egg").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "fish"){
    fish = !fish;
    if(fish){
      document.getElementById("fish").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("fish").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "soy"){
    soy = !soy;
    if(soy){
      document.getElementById("soy").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("soy").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "sesame"){
    sesame = !sesame;
    if(sesame){
      document.getElementById("sesame").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("sesame").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "nuts"){
    nuts = !nuts;
    if(nuts){
      document.getElementById("nuts").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("nuts").style.backgroundColor = "DarkGoldenRod"
    }
  }

  //TIMES
  if(button == "breakfast"){
    breakfast = !breakfast;
    if(breakfast){
      document.getElementById("breakfast").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("breakfast").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "lunch"){
    lunch = !lunch;
    if(lunch){
      document.getElementById("lunch").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("lunch").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "dinner"){
    dinner = !dinner;
    if(dinner){
      document.getElementById("dinner").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("dinner").style.backgroundColor = "DarkGoldenRod"
    }
  }

  if(button == "snack"){
    snacks = !snack;
    if(snack){
      document.getElementById("snack").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("snack").style.backgroundColor = "DarkGoldenRod"
    }
  }

  //DIET
  if(button == "vegetarian"){
    vegetarian = !vegetarian;
    if(vegetarian){
      document.getElementById("vegetarian").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("vegetarian").style.backgroundColor = "DarkGoldenRod"
    }
  }
  if(button == "vegan"){
    vegan = !vegan;
    if(vegan){
      document.getElementById("vegan").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("vegan").style.backgroundColor = "DarkGoldenRod"
    }
  }
  if(button == "pescetarian"){
    pescetarian = !pescetarian;
    if(pescetarian){
      document.getElementById("pescetarian").style.backgroundColor = "GoldenRod";
    }
    else{
      document.getElementById("pescetarian").style.backgroundColor = "DarkGoldenRod"
    }
  }
}

//Hardcoding countries for better results when using the API
//I recommend collapsing this section
function countryfilter(targetcountry){
  if(targetcountry == "France"){
    return "French&allowedCuisine[]=cuisine^cuisine-french"
  }
  if(targetcountry == "Germany"){
    return "German&allowedCuisine[]=cuisine^cuisine-german"
  }
  if(targetcountry == "Italy"){
    return "Italian&allowedCuisine[]=cuisine^cuisine-italian"
  }
  if(targetcountry == "United Kingdom"){
    return "English%20Scottish"
  }
  if(targetcountry == "Ireland"){
    return "Irish&allowedCuisine[]=cuisine^cuisine-irish"
  }
  if(targetcountry == "Hungary"){
    return "Hungarian&allowedCuisine[]=cuisine^cuisine-hungarian"
  }
  if(targetcountry == "Greece"){
    return "Greek&allowedCuisine[]=cuisine^cuisine-greek"
  }
  if(targetcountry == "Portugal"){
    return "Portuguese&allowedCuisine[]=cuisine^cuisine-portuguese"
  }
  if(targetcountry == "China"){
    return "Chinese&allowedCuisine[]=cuisine^cuisine-chinese"
  }
  if(targetcountry == "Japan"){
    return "Japanese&allowedCuisine[]=cuisine^cuisine-japanese"
  }
  if(targetcountry == "India"){
    return "Indian&allowedCuisine[]=cuisine^cuisine-indian"
  }
  if(targetcountry == "Spain"){
    return "Spanish&allowedCuisine[]=cuisine^cuisine-spanish"
  }
  if(targetcountry == "Sweden"){
    return "Swedish&allowedCuisine[]=cuisine^cuisine-swedish"
  }
  if(targetcountry == "Thailand"){
    return "Thai&allowedCuisine[]=cuisine^cuisine-thai"
  }
  if(targetcountry == "Cuba"){
    return "Cuban&allowedCuisine[]=cuisine^cuisine-cuban"
  }
  if(targetcountry == "Morocco"){
    return "Moroccan&allowedCuisine[]=cuisine^cuisine-moroccan"
  }
  if(targetcountry == "United States"){
    return "American&allowedCuisine[]=cuisine^cuisine-american"
  }
  if(targetcountry ==  "Czech Rep."){
    return "Czech"
  }
  if(targetcountry == "Russia"){
    return "Russian"
  }
  if(targetcountry == "Georgia"){
    return "Georgian"
  }
  if(targetcountry == "Turkey"){
    return "Turkish"
  }
  if(targetcountry == "Serbia"){
    return "Serbian"
  }
  if(targetcountry == "Bosnia and Herz."){
    return "Bosnian"
  }
  if(targetcountry == "Iraq"){
    return "Iraqi"
  }
  if(targetcountry == "Malaysia"){
    return "Malaysian"
  }
  if(targetcountry == "Sudan" || targetcountry == "S. Sudan"){
    return "Sudanese"
  }
  if(targetcountry == "Moldova"){
    return "Moldovan"
  }
  if(targetcountry == "Bolivia"){
    return "Bolivian"
  }
  if(targetcountry == "Panama"){
    return "Panamanian"
  }
  if(targetcountry == "Guatemala"){
    return "Guatemalan"
  }
  if(targetcountry == "Australia"){
    return "Australian"
  }
  if(targetcountry == "New Zealand"){
    return "New Zealander"
  }
  if(targetcountry == "Netherlands"){
    return "Dutch"
  }
  if(targetcountry == "Switzerland"){
    return "Swiss"
  }
  if(targetcountry == "Bahamas"){
    return "Bahamian"
  }
  if(targetcountry == "Zambia"){
    return "Zambian"
  }
  if(targetcountry == "Iran"){
    return "Iranian"
  }
  if(targetcountry == "Saudi Arabia"){
    return "Arabian"
  }
  if(targetcountry == "Lebanon"){
    return "Lebanese"
  }
  if(targetcountry == "Yemen"){
    return "Yemeni"
  }
  if(targetcountry == "Oman"){
    return "Omani"
  }
  if(targetcountry == "Slovenia"){
    return "Slovenian"
  }
  if(targetcountry == "Albania"){
    return "Albanian"
  }
  if(targetcountry == "Bulgaria"){
    return "Bulgarian"
  }
  if(targetcountry == "Egypt"){
    return "Egyptian"
  }
  if(targetcountry == "Lithuania"){
    return "Lithuanian"
  }
  if(targetcountry == "Latvia"){
    return "Latvian"
  }
  if(targetcountry == "Estonia"){
    return "Estonian"
  }
  if(targetcountry == "Brazil"){
    return "Brazillian"
  }
  if(targetcountry == "Kyrgyzstan"){
    return "Kyrgyz"
  }
  if(targetcountry == "Kyrgyzstan"){
    return "Kyrgyz"
  }
  if(targetcountry == "Tajikistan"){
    return "Tajik"
  }
  if(targetcountry == "Pakistan"){
    return "Pakistani"
  }
  if(targetcountry == "Kazakhstan"){
    return "Kazakh"
  }
  if(targetcountry == "Mongolia"){
    return "Mongolian"
  }
  if(targetcountry == "Nepal"){
    return "Nepalese"
  }
  if(targetcountry == "Bangladesh"){
    return "Bangladeshi"
  }
  if(targetcountry == "Myanmar"){
    return "Burmese"
  }
  if(targetcountry == "Sri Lanka"){
    return "Sri Lankan"
  }
  if(targetcountry == "Cambodia"){
    return "Cambodian"
  }
  if(targetcountry == "Malaysia"){
    return "Malaysian"
  }
  if(targetcountry == "Indonesia"){
    return "Indonesian"
  }
  if(targetcountry == "Vietnam"){
    return "Vietnamese"
  }
  if(targetcountry == "Philippines"){
    return "Filipino"
  }
  if(targetcountry == "Papua New Guinea"){
    return "Papua New Guinean"
  }
  if(targetcountry == "New Caledonia"){
    return "New Caledonian"
  }
  if(targetcountry == "Chile"){
    return "Chilean"
  }
  if(targetcountry == "Peru"){
    return "Peruvian"
  }
  if(targetcountry == "Suriname"){
    return "Surinamese"
  }
  if(targetcountry == "Guatemala"){
    return "Guatemalan"
  }
  if(targetcountry == "Honduras"){
    return "Honduran"
  }
  if(targetcountry == "Jamaica"){
    return "Jamaican"
  }
  if(targetcountry == "Taiwan"){
    return "Taiwanese"
  }
  if(targetcountry == "Lao PDR"){
    return "Laotian"
  }
  if(targetcountry == "Cambodia"){
    return "Cambodian"
  }
  if(targetcountry == "Dem. Rep. Korea"){
    return "North Korean"
  }
  if(targetcountry == "Azerbaijan"){
    return "Azerbaijani"
  }
  if(targetcountry == "Armenia"){
    return "Armenian"
  }
  if(targetcountry == "Montenegro"){
    return "Montenegrin"
  }
  if(targetcountry == "Macedonia"){
    return "Macedonian"
  }
  if(targetcountry == "Finland"){
    return "Finnish"
  }
  if(targetcountry == "Norway"){
    return "Norwegian"
  }
  if(targetcountry == "Canada"){
    return "Canadian"
  }
  if(targetcountry == "Venezuela"){
    return "Venezuelan"
  }
  if(targetcountry == "Colombia"){
    return "Colombian"
  }
  if(targetcountry == "Argentina"){
    return "Argentinian"
  }
  if(targetcountry == "Ecuador"){
    return "Ecuadorian"
  }
  if(targetcountry == "Angola"){
    return "Angolan"
  }
  if(targetcountry == "Poland"){
    return "Polish"
  }
  if(targetcountry == "Austria"){
    return "Austrian"
  }
  if(targetcountry == "Afghanistan"){
    return "Afghan"
  }
  if(targetcountry == "Uzbekistan"){
    return "Uzbek"
  }
  if(targetcountry == "Kuwait"){
    return "Kuwaiti"
  }
  if(targetcountry == "Rwanda"){
    return "Rwandan"
  }
  if(targetcountry == "Burundi"){
    return "Burundian"
  }
  if(targetcountry == "South Africa"){
    return "South African"
  }
  if(targetcountry == "Eritrea"){
    return "Eritrean"
  }
  if(targetcountry == "Somalia" || targetcountry == "Somaliland"){
    return "Somalian"
  }
  if(targetcountry == "Kenya"){
    return "Kenyan"
  }
  if(targetcountry == "Uganda"){
    return "Ugandan"
  }
  if(targetcountry == "Syria"){
    return "Syrian"
  }
  if(targetcountry == "Libya"){
    return "Libyan"
  }

  else{
    return targetcountry
  }
}


//----------------------------CREATING AND POPULATING MAP---------------------------------

//adds functionality to each feature on the map
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: popupFeature,
    });
    layer._leaflet_id = feature.properties.name;
}

//initiates and populates the map
$.getJSON('../js/custom.geo.json',function(data){
            mymap = L.map('mapid').setMinZoom(2).setMaxBounds([[110,200], [-110,-200]]).setView([32,-35], 3);
            var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution:'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });

            Esri_WorldGrayCanvas.addTo(mymap);

            geojson = L.geoJson(data, {style: style, onEachFeature: onEachFeature}).addTo(mymap);
})
