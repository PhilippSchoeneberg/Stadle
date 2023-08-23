mapboxgl.accessToken = 'pk.eyJ1IjoicGgxbDFwcCIsImEiOiJjbGxreXZkZ28xeW5xM2RwcXlrbzRkNmhlIn0.qY5qcQHDTATDcrGeYGqriA';

var gameOver = false;
var usedCounter;
var hintCounter = 0;
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
const losGehtsButton = document.querySelector(".losGehtsButton");
const hintButton = document.querySelector(".hintButton");

const endPopup = document.querySelector(".endPopup");
const okButton = document.querySelector(".okButton");

var places = [
                ["Rathaus", "9.4756788", "53.6023594", "false", "Das zwei Etagen hohe Bauwerk misst im Hauptgebäude eine Län-ge von 35 Metern und im Ostflügel eine Länge von 31 Metern . Bis zur Fertigstellung des direkt mit dem ursprünglichen Teil verbunde-nen Neubaus im Jahre 1988 war das in der Schwedenzeit errichtete Gebäude Mittelpunkt der Verwaltung Stades. ", "Jedoch befinden sich heute noch der Ratskeller, das Standesamt, der Ratssaal, eini-ge Büros und der nach dem schwedischen Grafen benannte Kö-nigsmarcksaal, der als Festsaal dient, in dem alten Gebäude. ", "Über dem Haupteingang zur Hökerstraße ist das Wappen von Schwedens König Karl XI abgebildet und erinnert ebenfalls an die Herrschaftszeit in Stade .", "resources/figures/rathaus0.jpg"],
                ["Zeughaus", "9.4751193", "53.6004986", "false", "Das in den Jahren 1697-1699 errichtete Gebäude diente den Schweden im Krieg gegen die Dänen als Lagerplatz für Waffen und Material. ", "Der Name des Gebäudes steht groß über dem Haupteingang des zweistöckigen Großbaus. Über dem Portal ist das Wappen des schwedischen Königs, zu dieser Zeit Karl XII, abgebildet. ", "Seit dem Umbau zur Markthalle vor rund einhundert Jahren hatte das Gebäude viele Funktionen. So zogen in das Gebäude zeitweise ein Kino sowie eine Jugendherberge und heute eine Eisdiele und eine irische Bar.", "resources/figures/zeughaus0.jpg"]
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

document.querySelector("#historicImg").src=places[todaysPlace][7];

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
        if(distance <= 5){
            points = 1000;
        }
        else if(distance < 500){
            points = Math.round((1000-distance*2)/(hintCounter+1));
        }
        else{
            points = 0;
        }
        document.querySelector("#endText").innerText = "Du warst " + distance + " Meter vom Ziel entfernt und erhälst " + points + " Punkte.";
        endPopup.classList.add("openPopup");
        hintCounter = 0;
    }
})

losGehtsButton.addEventListener("click", () => {
    mainPopup.classList.remove("openPopup");
    mainButton.classList.remove("hide");
    document.querySelector(".mainButton").innerText = "Absenden";
})

hintButton.addEventListener("click", () => {
    if(hintCounter == 0){
        hintCounter++;
        document.querySelector("#historicText").innerText = places[todaysPlace][4]
    }
    else if(hintCounter == 1){
        hintCounter++;
        document.querySelector("#historicText").innerText = document.querySelector("#historicText").innerText+places[todaysPlace][5];
    }
    else if(hintCounter == 2){
        hintCounter++;
        document.querySelector("#historicText").innerText = document.querySelector("#historicText").innerText+places[todaysPlace][6];
        hintButton.classList.add("hide");
    }
})

okButton.addEventListener("click", () => {
    endPopup.classList.remove("openPopup");
})