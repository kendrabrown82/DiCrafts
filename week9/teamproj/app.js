let map;
// array to store country information from covid call
const countryData = [];

// main Google Maps call
function initMap() {
  var myLatLng = {
    lat: 29.7604,
    lng: -95.3698
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });


  // ----------------------- COVID API CALL ----------------------- //

  axios.get('https://api.covid19api.com/summary')
    .then((response) => {
      return response;
    })
    // returning data and storing it in the countryData array
    .then((data) => {
      countryData.push(data.data.Countries);
      //console.log(countryData[0][1]['TotalConfirmed']);
      for (let c in countryData[0]) {
        // getting the slug/country name in order to make another request
        //console.log(countryData[0][c]['Slug']);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${countryData[0][c]['Slug']}&key=AIzaSyDfxwu3-PAncezf5PNwdncW-p_AR-j-EdE`)
          .then((lData) => {
            return lData;
          })
          .then((lResp) => {
           // combining data from countryData array and google geocode request to get country name, total confirmed, and lat/long
            console.log(countryData[0][c]['Country'], countryData[0][c]['TotalConfirmed'], lResp.data.results[0].geometry.location);
            //function to draw circles on map
            drawCircles(lResp.data.results[0].geometry.location, countryData[0][c]['TotalConfirmed']);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          })
      }

    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    })




  // ----------------------- FUNCTIONS ----------------------- //

  //draw circles
  function drawCircles(coords, drawValue) {
    const cityCircle = new google.maps.Circle({
      strokeColor: "white",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "red",
      fillOpacity: 0.35,
      map,
      center: coords,
      radius: Math.sqrt(drawValue) * 1000
    });
  }


} // <-- initMap()

// --------  pie chart test ------------ //
const cPie = document.getElementById('countryChart').getContext('2d');
const pieChart = new Chart(cPie, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Total Found: 30403', 'Discovered: 2134343', 'Confirmed: 32443', 'Expected', 'Topped'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: ['red', 'blue', 'orange', 'purple', 'yellow'],
            data: [40, 10, 5, 2, 20]
        }]
    },

    // Configuration options go here
    options: {
      cutoutPercentage: 30,
      animation: { animateScale: true },
      "responsive": true,
      "maintainAspectRatio": false
    }
})

// --------  bar chart test ------------ //
const gtBarChart = document.getElementById('gtChart').getContext('2d');
const totalsBarChart = new Chart(gtBarChart, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Total Found', 'Discovered', 'Confirmed', 'Expected', 'Topped'],
        datasets: [{
            label: 'Global Totals',
            backgroundColor: ['red', 'blue', 'orange', 'purple', 'yellow'],
            data: [403, 7043, 644, 345, 202]
        }]
    },

    // Configuration options go here
    options: {
      animation: { animateScale: true },
      "responsive": true,
      "maintainAspectRatio": true
    }
})


//////////////// Test Area to Junk Eventually ////////////////

/////// example to get lat and long for a country !!!!!!!!!
// axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=Nigeria&key=AIzaSyDfxwu3-PAncezf5PNwdncW-p_AR-j-EdE")
//   .then((response) => {
//     return response
//   })
//   .then((data) => {
//     console.log(data.data.results[0].geometry.location);
//   })


//   axios.get('https://api.covid19api.com/summary')
//     .then((response) => {
//       return response;
//     })
//     .then((data) => {
//       //console.log(data);
//       marker.addListener('click', function () {
//         let contentString = data.data.Global;
//         console.log(data.data)
//           let renderData = document.getElementById('renderData');

//           renderData.innerHTML = 
//           `
//           <p>New Confirmed: ${contentString['NewConfirmed']}</p>
//           `
//           //console.log(contentString);

//       });
//     })
//     .catch((error) => {
//       console.log(`Error: ${error}`);
//     })


//Linking to Google Maps API
// axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
//     params: {
//       address: location,
//       key: 'AIzaSyDfxwu3-PAncezf5PNwdncW-p_AR-j-EdE'
//     }
//   })
//   .then(function (response) {
//     console.log(response)
//     //return response.data.results[0].geometry.location;
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

// const citymap = {
//   chicago: {
//     center: {
//       lat: 41.878,
//       lng: -87.629,

//     },
//     population: 2714856,
//     cases: 123039
//   },
//   newyork: {
//     center: {
//       lat: 40.714,
//       lng: -74.005
//     },
//     population: 8405837,
//     cases: 2434
//   }
// };


// for (const city in citymap) {
//   // Add the circle for this city to the map.
//   const cityCircle = new google.maps.Circle({
//     strokeColor: "white",
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: "red",
//     fillOpacity: 0.35,
//     map,
//     center: citymap[city].center,
//     radius: Math.sqrt(citymap[city].cases) * 1000
//   });
// }