/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

//map options: centering coordinates and zoom level
var mapOptions = {
	center: {lat: 47.655, lng: -122.3080},
	zoom: 14  //0=Earth to 21=max zoom
}

//element inside which the map should appear
//usually just a <div> somewhere on the page
var mapElem = document.getElementById('map');

//create the map
var map = new google.maps.Map(mapElem, mapOptions);

//marker position
//note that values must be numbers, not strings!
var position = {
	lat: 47.655,
	lng: -122.3080
};

//create a marker on the map
var marker = new google.maps.Marker({
	position: position,
	map: map
});

//remove marker from the map
// marker.setMap(null);

//marker still exists in memory and can be added to the 
//map again by calling setMap passing a valid map
// marker.setMap(map);

//create a new InfoWindow
var infoWin = new google.maps.InfoWindow();

function onGeoPos(position) {
	//position.coords.latitude = current latitude
	//position.coords.longitude = current longitude
	//position.coords.altitude = current altitude (if available)
	//console.log(position);
	console.log("Lat: " + position.coords.latitude);
	console.log("Lng: " + position.coords.longitude);

	var myLocation = new google.maps.Marker({
		position: {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		},
		map: map
	});

	//set the content (may contain HTML tags)
	infoWin.setContent('<p>hello world! My lat is ' 
		+ position.coords.latitude 
		+ ' and my lng is ' 
		+ position.coords.longitude 
		+ '</p>'
	);

	//listen for click event on marker
	google.maps.event.addListener(myLocation, 'click', onMarkerClick);
} //onGeoPos()

function onGeoErr(error) {
	//error.code == error.PERMISSION_DENIED (user denied)
	//error.code == error.TIMEOUT (request timed out)
	//error.code == error.POSITION_UNAVAILABLE (unavailable)
} //onGeoErr()

//enable high accuracy using third parameter
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onGeoPos, onGeoErr, 
		{enableHighAccuracy: true, maximumAge: 30000}); //use cached values up to 5 minutes ago
} else {
	//geolocation not supported
	console.log("geolocation not supported");
}

function onMarkerClick () {
	//'this' keyword will refer to the marker object

	//pan the map so that marker is at center
	map.panTo(this.getPosition());

	//open it on the map, anchored to a marker
	infoWin.open(map, this);
}


