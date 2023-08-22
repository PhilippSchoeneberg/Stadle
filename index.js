mapboxgl.accessToken = 'pk.eyJ1IjoicGgxbDFwcCIsImEiOiJjbGxreXZkZ28xeW5xM2RwcXlrbzRkNmhlIn0.qY5qcQHDTATDcrGeYGqriA';

var gameOver = false;
var usedCounter;
var mylng;
var mylat;
var options = {units: 'meters'}
var distance;
var points;

const mainButton = document.querySelector(".mainButton");
var playButton = true;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ph1l1pp/clll2qnux01d101ph7rnngtvv',
    center: [9.476206, 53.600979],
    zoom: 15
});
var marker;
var markerPlaced =  false;

const mainPopup = document.querySelector(".mainPopup");
const losGehtsButton = document.querySelector("#losGehtsButton");
const tippButton = document.querySelector("#tippButton");

const endPopup = document.querySelector(".endPopup");
const okButton = document.querySelector("#okButton");

var places = [
                ["Rathaus", "9.473782", "53.601507", "false", "Rathaustipp 1 ", "Rathaustipp 2"],
                ["Zeughaus", "9.475159", "53.600133", "false", "Zeughaustipp 1 ", "Zeughaustipp 2"]
             ]



var todaysPlace = rand(0, places.length-1);                                                 //rausnehmen zum Schluss!!!!

function rand (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*if(heute.getHours() == 0){
    places[todaysPlace][3] = true;
    for(var i = 0; i < places.length-1; i++){
        if(places[i][3] === "true"){
            usedCounter++;
        }
    }
    if(usedCounter ==  places.length-1){
        for(var i = 0; i < places.length-1; i++){
            places[i][3] = "false";
        }
    }
    usedCounter = 0;
    var todaysPlace = rand(0, places.length-1);
    while(places[todaysPlace][3] === "true"){
        var todaysPlace = rand(0, places.length-1);
    }
}*/

document.querySelector("#historicText").innerText = places[todaysPlace][4];

map.on('click', (e) => {
    mylng = e.lngLat.lng;
    mylat = e.lngLat.lat;
    if(playButton == false){
        if(markerPlaced == false){
            marker = new mapboxgl.Marker()
            .setLngLat([mylng, mylat])
            .addTo(map);
            markerPlaced = true;
        }
        else if(gameOver == false){
            marker.setLngLat([mylng, mylat])
        }
    }
});

function addMarker(lng, lat){
    new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
}


mainButton.addEventListener("click", () => {
    if(playButton == true){
        playButton = false
        mainPopup.classList.add("openPopup");
        mainButton.classList.add("hide");
    }
    else if(markerPlaced == true){
        mainButton.classList.add("hide");
        gameOver = true;
        addMarker(places[todaysPlace][1], places[todaysPlace][2]);
        distance = Math.round(turf.distance([places[todaysPlace][1], places[todaysPlace][2]], [mylng, mylat], options));
        points = Math.round(1/(distance+1)*1000);
        document.querySelector("#endText").innerText = "Du warst " + distance + " Meter vom Ziel entfernt und erhälst " + points + " Punkte.";
        endPopup.classList.add("openPopup");
    }
})

losGehtsButton.addEventListener("click", () => {
    mainPopup.classList.remove("openPopup");
    mainButton.classList.remove("hide");
    document.querySelector(".mainButton").innerText = "Absenden";
})

tippButton.addEventListener("click", () => {
    document.querySelector("#historicText").innerText = places[todaysPlace][4]+places[todaysPlace][5];
})

okButton.addEventListener("click", () => {
    endPopup.classList.remove("openPopup");
})