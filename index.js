mapboxgl.accessToken = 'pk.eyJ1IjoicGgxbDFwcCIsImEiOiJjbGxreXZkZ28xeW5xM2RwcXlrbzRkNmhlIn0.qY5qcQHDTATDcrGeYGqriA';

var gameOver = false;
var usedCounter;
var hintCounter = 0;
var mylng;
var mylat;
var options = {units: 'meters'}
var distance;
var points;

const backToStadeButton = document.querySelector(".backToStadeButton");
const instructionButton = document.querySelector(".instructionButton");
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

const instructionPopup = document.querySelector(".instructionPopup");

const endPopup = document.querySelector(".endPopup");
const okButton = document.querySelector(".okButton");
const ok2Button = document.querySelector(".ok2Button");
const historicTextButton = document.querySelector(".historicTextButton");

const historicTextPopup = document.querySelector(".historicTextPopup");

const thanksButton = document.querySelector(".thanksButton");

var places = [
                ["Rathaus", "9.476004", "53.601418", "false", "1. Das zwei Etagen hohe Bauwerk misst im Hauptgebäude eine Länge von 35 Metern und im Ostflügel eine Länge von 31 Metern. Bis zur Fertigstellung des direkt mit dem ursprünglichen Teil verbunde-nen Neubaus im Jahre 1988 war das in der Schwedenzeit errichtete Gebäude Mittelpunkt der Verwaltung Stades. ", "2. Jedoch befinden sich heute noch der Ratskeller, das Standesamt, der Ratssaal, einige Büros und der nach dem schwedischen Grafen benannte Königsmarcksaal, der als Festsaal dient, in dem alten Gebäude. ", "3. Über dem Haupteingang zur Hökerstraße ist das Wappen von Schwedens König Karl XI abgebildet und erinnert ebenfalls an die Herrschaftszeit in Stade. ", "resources/figures/Rathaus.jpeg", "Ich bin ein historischer Text"],
                ["Zeughaus", "9.475161", "53.600119", "false", "1. Das in den Jahren 1697-1699 errichtete Gebäude diente den Schweden im Krieg gegen die Dänen als Lagerplatz für Waffen und Material. ", "2. Der Name des Gebäudes steht groß über dem Haupteingang des zweistöckigen Großbaus. Über dem Portal ist das Wappen des schwedischen Königs, zu dieser Zeit Karl XII, abgebildet. ", "3. Seit dem Umbau zur Markthalle vor rund einhundert Jahren hatte das Gebäude viele Funktionen. So zogen in das Gebäude zeitweise ein Kino sowie eine Jugendherberge und heute eine Eisdiele und eine irische Bar. ", "resources/figures/Zeughaus.jpeg", "Ich bin ein historischer Text"],
		        ["Schwedenspeicher", "9.476920", "53.603956", "false", "1. Nachdem es seit Baubeginn 1692 zunächst zu einigen Komplikationen, wie einem Mangel an Materialien und Geld, gekommen war, wurde das Bauwerk erst im Jahr 1705 fertiggestellt. ", "2. Das Gebäude besteht aus zwei Voll- und drei Dachgeschossen, die auf einem starken Fundament ruhen. Da bei diesem militärischen Bauwerk der Zweck der Optik übergeordnet war, wirkt es recht schmucklos. ", "3. Das ehemalige Provianthaus fungiert heute als Museum und bildet seine Besucher in mehreren Themengebieten der Heimatkunde und Geschichte. ", "resources/figures/Schwedenspeicher.jpeg", "Ich bin ein historischer Text"],
                ["Kirche St. Cosmae", "9.476250", "53.601910", "false", "1. Das alte Backsteingebäude wurde im 13. Jahrhundert erbaut, es wurde über die Jahre oft renoviert und repariert und ist deshalb keinem der historischen Baustiele vollkommen zuzuordnen. ", "2. Der höchste Punkt des Gebäudes ist 62,45 m hoch. ", "3. Die Grundrisse des Gebäudes sind auf die 1130er Jahre zurückzuführen, damals wurde dieses als Kapelle erbaut. Heute stellt sie die Hauptkirche des Kirchenkreises Stade dar. ", "resources/figures/KircheStCosmae.png", "Die wunderschöne St. Cosmae-Kirche ist fast so alt wie Stade selber und prägt seit Jahrhunderten das Stadtbild. Ihr voller Name lautet Ss. Cosmae et Damiani, abstammend von den syrischen Zwillingsbrüdern Cosmas und Damian, welche für ihre Arbeit als Ärzte als Heilige verehrt wurden. Schon im 9. oder 10. Jahrhundert entstand der romanische Vorgängerbau unserer heutigen Kirche. Die einstige Ratskapelle der Stader Grafen erlebte über die Jahre viele Umbauten, der heutige Backsteingotikbau stammt allerdings aus dem 13. Jahrhundert und dient bis heute als Wahrzeichen der Stadt. Vom 15. bis zum 17. Jahrhundert folgten weitere Umbauten wie der Anbau von Nebenräumen, der Bau des Brauthauses, sowie die Verschönerung der Ostfassade. Tragischerweise wurde das innere der Kirche, sowie ihr Turmhelm im Stader Stadtbrand von 1659 fast vollständig zerstört. Durch den Wiederaufbau erhielt der Turmhelm St. Cosmae‘s allerdings auch seine charakteristische barocke Form, welche ihn bis heute auszeichnet. Glanzstück der Kirche ist die 1668-75 erbaute Barockorgel des Glückstädter Orgelbauers Berendt Huß, welcher als berühmtester Orgelbauer des Nordens gilt. Heute ist die Kirche für Gebete und stille Andachten geöffnet, touristische Besichtigungen, sowie das Besteigen des Kirchturms sind ebenfalls möglich."],
                ["Mutter Flint", "9.475893", "53.603185 ", "false", "1. Die lebensgroße Statue wurde vor 35 Jahren errichtet, um an eine Frau zu erinnern, die im 19. Jahrhundert in Stade gelebt hat. ", "2. Sie hatte bis ins hohe Alter ihren eigenen Stand am Fischmarkt und verkaufte fangfrische Fische, deshalb war sie unter den Stadern sehr bekannt. ", "3. Ihre Waren transportierte sie in einem Kinderwagen, so ergab sich ihr Name: Mutter Flint. ", "resources/figures/MutterFlint.png", "Margarete Flint, besser bekannt als Mutter Flint mit dem Stint, war eine sehr bekannte Marktverkäuferin in der Altstadt Stades. Geboren wurde sie 1861 und wurde 91 Jahre alt. Bekannt wurde sie durch das Verkaufen mit ihrem Ehemann. Bis ins hohe Alter verkauften sie Fisch, vor allem Aale, Hering, Seezungen und Stint, der Fisch, welcher ihr ihren Spitznamen gab. Bekannt wurde die Mutter Flint durch die spezielle Transportweise, denn sie transportierte ihren Fisch in einem Kinderwagen. Dazu legte sie Wachstücher in diesen, damit er nicht den stinkenden Fischgeruch annahm. Heute erinnert eine Bronzestatue am Fischmarkt an die legendäre Fischverkäuferin, mit ihr ein Korb, ein Hecht in ihrer Hand und eine Katze. "],
                ["Holzkran ", "9.476202", "53.603102", "false", "1. Dieses Bauwerk verkörpert den wichtigsten Bestandteil des Stader Hafens im 14. - 18. Jahrhundert. ", "2. Er soll eine Tragkraft von ca. 5 Tonnen gehabt haben. Das heutige Bauwerk ist allerdings nur ein Nachbau als Denkmal an den damaligen Fischmarkt. ", "3. Heutzutage dient er als Touristenattraktion und kleines Ausstellungsgebäude. ", "resources/figures/Holzkran.png", "Im Jahr 1337 entstand am Hansehafen ein hölzerner Tretkran mit außen angebrachtem Laufrad. Nachdem dieser im Stadtbrand 1659 zerstört wurde, entstand schon 1661 ein neuer, 15 Meter hoher Holzkran mit 6,50 Metern Ausladung. Angetrieben von Treträdern mit 4,40 Metern Durchmesser, bediente eine Mannschaft aus zehn bis zwölf Personen den Kran. Die Traglast betrug bis zu 4,8 Tonnen. Trotz intaktem Zustand wurde der Kran 1898 abgebrochen. 1977 rekonstruierte der Rotary-Club den hölzernen Tretkran nach Plänen von Hans-Otto Schlichtmann. Finanzielle Unterstützung von Baudenkmalpflege, Firmen und Bürgern sowie Hilfe vom Pionierbataillon 3 der Bundeswehr ermöglichten den Wiederaufbau. Die Hebetechnik fehlt, aber seit 1990 dient der Kran als Informationszentrum zur Hafen- und Schifffahrtsgeschichte. Er setzt sich für die Wiederschiffbarmachung des seit 1967 abgeschotteten Hansehafens ein, der seit seiner Inbetriebnahme im Jahr 1250 unverändert ist. "],
                ["Bürgermeister-Hinze-Haus", "9.476365", "53.603847", "false", "1. Das Gebäude war ein spätmittelalterliches Kaufmannshaus. Es blieb zwar vom Stadtbrand verschont, jedoch wurde es durch Überflutungen immer wieder beschädigt. ", "2. 1621 sorgte der Bürgermeister Heino Hinze für den Bau einer Zierfassade im Weserrenaissancestil. Auch diese Fassade wurde bei den Reparaturen 1930 erneuert. ", "3. Jetzt befinden sich darin eine Galerie sowie Büro- und Wohnungsräume. ", "resources/figures/BuergermeisterHinzeHaus.png", "Ich bin ein historischer Text"]
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

instructionPopup.classList.add("openPopup");

document.querySelector("#historicImg").src=places[todaysPlace][7];
document.querySelector("#historicText").innerText = places[todaysPlace][8];

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


backToStadeButton.addEventListener("click", () => {
    map.flyTo({
        center: [9.476206, 53.600979],
        zoom: 15
    });
})

instructionButton.addEventListener("click", () => {
    instructionPopup.classList.add("openPopup");
})

mainButton.addEventListener("click", () => {
    if(playButton == true){
        instructionPopup.classList.remove("openPopup");
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
            points = Math.round(1000/(hintCounter+1));
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
        document.querySelector("#historicText0").innerText = places[todaysPlace][4]
    }
    else if(hintCounter == 1){
        hintCounter++;
        document.querySelector("#historicText1").innerText = places[todaysPlace][5];
    }
    else if(hintCounter == 2){
        hintCounter++;
        document.querySelector("#historicText2").innerText = places[todaysPlace][6];
        hintButton.classList.add("hide");
    }
})

okButton.addEventListener("click", () => {
    instructionPopup.classList.remove("openPopup");
})

historicTextButton.addEventListener("click", () => {
    endPopup.classList.remove("openPopup");
    historicTextPopup.classList.add("openPopup");
})

ok2Button.addEventListener("click", () => {
    endPopup.classList.remove("openPopup");
})

thanksButton.addEventListener("click", () => {
    historicTextPopup.classList.remove("openPopup");
})