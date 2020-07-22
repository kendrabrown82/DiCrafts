var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.2672, lng: -97.7431 },
    zoom: 5
  });

} // <---initMap


showBTN = document.getElementById('show');
clrBTN = document.getElementById('clear');


//array of capital cities and empty array to push lat-long to just in case
const capCities = ["Austin", "Salt Lake City", "Sacremento", "Oklahoma City", "Topeka"];
const markers = [];

// ------------------ Functions ------------------- //

// fetch long-lat of the cities, and map them
function geoCode(city) {
    var location = city;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
        params: {
            address: location,
            key: 'AIzaSyDfxwu3-PAncezf5PNwdncW-p_AR-j-EdE'
        }
    })
    .then(function(response) {
        //console.log(response.data.results[0].geometry.location);
        return response.data.results[0].geometry.location;
    })
    .then(function(data) {
        //call to add capital city markers on map
        addMarker(data);
   
    })
    .catch(function(error) {
        console.log(error);
    })   
}


// Set markers on map to null to clear them
function removeMarkers() {
    markers.forEach((e) => {
    e.setMap(null);
    })
}


// add markers to map and to array to store them
function addMarker(loc) {
    var marker = new google.maps.Marker({
      position: loc,
      map: map
    });
    markers.push(marker);
  }



// ------------- Event Listeners ------------ //

// add the markers
showBTN.addEventListener('click', function() {
    capCities.forEach((el) => {
        geoCode(el);  
    })
})


// remove the markers
clrBTN.addEventListener('click', removeMarkers);



