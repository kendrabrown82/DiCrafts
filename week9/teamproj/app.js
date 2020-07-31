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


  // ---- COVID and Google Maps API to Draw Circles ---- //
  axios.get('https://api.covid19api.com/summary')
    .then((response) => {
      return response;
    })
    // returning data and storing it in the countryData array
    .then((data) => {
      countryData.push(data.data.Countries);
      //console.log(data.data);
      //object to store global stats
      globalInfo = {
        'New Confirmed': data.data.Global['NewConfirmed'],
        'New Deaths': data.data.Global['NewDeaths'],
        'New Recovered': data.data.Global['NewRecovered'],
        'Total Confirmed': data.data.Global['TotalConfirmed'],
        'Total Deaths': data.data.Global['TotalDeaths'],
        'Total Recovered': data.data.Global['TotalRecovered']
      }

      // draw pie chart of world wide totals
      drawChart(globalInfo, 'doughnut', 'grandTotals', false, '');

      // for (let c in countryData[0]) {
      //   // getting the slug/country name in order to make another request
      //   //console.log(countryData[0][c]['Slug']);
      //   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${countryData[0][c]['Slug']}&key=AIzaSyAOntje_nb9MDRE2p9-b6H2uBtqwSDCT0g`)
      //     .then((lData) => {
      //       return lData;
      //     })
      //     .then((lResp) => {
      //       // combining data from countryData array and google geocode request to get country name, total confirmed, and lat/long
      //       //console.log(countryData[0][c]['Country'], countryData[0][c]['TotalConfirmed'], lResp.data.results[0].geometry.location);
      //       //function to draw circles on map
      //       drawCircles(lResp.data.results[0].geometry.location, countryData[0][c]['TotalConfirmed']);
      //     })
      //     .catch((err) => {
      //       console.log(`Error: ${err}`);
      //     })
      // }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    })


  // ------------- Country Search ---------- //
  let searchButton = document.getElementById('searchButton')

  searchButton.addEventListener('click', function () {
    let country = document.getElementById('countrySearch').value;
    country = country.replace(/\s+/g, '-').toLowerCase();
    axios.get(`https://api.covid19api.com/summary`)
      .then((response) => {
        return response;
      })
      .then((data) => {
        //console.log(data.data);
        let contentString = data.data.Countries;
        let countryData = contentString.find(search => country == search.Slug)
        //console.log(countryData);
        //let renderData = document.getElementById('renderData');
        //console.log(contentString['NewConfirmed'])

        //getting totals from the searched country above and passing it to an object
        const totalsData = {
          'Total Confirmed': countryData['TotalConfirmed'],
          'Total Deaths': countryData['TotalDeaths'],
          'Total Recovered': countryData['TotalRecovered']
        };

        //draw chart for selected country
        drawChart(totalsData, 'bar', 'searchedTotals', true, 'Country Overview');

        //nested call to get lat/long for country, reset center of map to country, and draw circle
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=AIzaSyAOntje_nb9MDRE2p9-b6H2uBtqwSDCT0g`)
          .then((response) => {
            return response
          })
          .then((data) => {
            //console.log(data);
            map.setCenter(new google.maps.LatLng(data.data.results[0].geometry.location.lat, data.data.results[0].geometry.location.lng));
            //console.log(data.data.results[0].geometry.location);
            drawCircles(data.data.results[0].geometry.location, countryData['TotalRecovered']);
          })
          .catch((error) => {
            console.log(`${error}... yikes`);
          })
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      })

  })


  // ---- Request to get World Totals ---- //
  //get the countries sorted by cases in ascending order
  axios.get('https://corona.lmao.ninja/v2/countries?&sort=cases')
    .then((response) => response)
    .then((data) => {
      // creating blank object and assigning the top 10 to the object
      cTopTotals = {};
      for (let i = 0; i < 10; i++) {
        //console.log(data.data[i].country, data.data[i].active);
        cTopTotals[data.data[i].country] = data.data[i].active;
      }
      //draw the top 10 results
      drawChart(cTopTotals, 'horizontalBar', 'topConfirmed', false, 'Active Cases');

    })


  // ----------------------- FUNCTIONS ----------------------- //
  // -------------------------------------------------------- //

  // Draw circles on map based on lat/long coords and Total Confirmed(drawValue)
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


// --------  Draw Chart ------------ //
// passes in an object of data, as well as DOM info and aspect ratio due to canvas div requirements
function drawChart(anObject, typeOfBar, domID, aspectRatio, label) {
  const gtBarChart = document.getElementById(domID).getContext('2d');
  const totalsBarChart = new Chart(gtBarChart, {
    // The type of chart we want to create
    type: typeOfBar,

    // The data for our dataset with labels and data passed in as objects
    data: {
      labels: Object.keys(anObject),
      datasets: [{
        label: label,
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(65,105,225, 0.5)', 'rgba(255,153,51, 0.5)', 'rgba(255,255,0, 0.5)', 'rgba(0,128,0, 0.5), rgba(0,153,76, 0.5)', 'rgba(153,0,153, 0.5)', 'rgba(255,20,147, 0.5)', 'rgba(165,42,42, 0.5)', 'rgba(64,224,208, 0.5)', 'rgba(255, 218, 185, 0.5)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(65,105,225)', 'rgb(255,153,51)', 'rgb(255,255,0)', 'rgb(0,128,0), rgb(0,153,76)', 'rgb(153,0,153)', 'rgb(255,20,147)', 'rgb(165,42,42)', 'rgb(64,224,208)', 'rgb(255, 218, 185)'],
        borderWidth: 1,
        data: Object.values(anObject)
      }]
    },

    // Configuration options go here
    options: {
      animation: {
        animateScale: true
      },
      "responsive": true,
      "maintainAspectRatio": aspectRatio
    }
  })
}


//////////////// Test Area to Junk Eventually ////////////////

// function changeCenter(center) {
//   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${center}&key=AIzaSyAOntje_nb9MDRE2p9-b6H2uBtqwSDCT0g`)
//     .then((response) => {
//       return response
//     })
//     .then((data) => {
//       map.setCenter(new google.maps.LatLng(data.data.results[0].geometry.location.lat, data.data.results[0].geometry.location.lng));

//     })
//     .catch((error) => {
//       console.log('yikes')
//     })
//   // return data.data.results[0].geometry.location
// }


// --------  pie chart test ------------ //
// const cPie = document.getElementById('grandTotalssss').getContext('2d');
// const pieChart = new Chart(cPie, {
//   // The type of chart we want to create
//   type: 'doughnut',

//   // The data for our dataset
//   data: {
//     labels: ['Total Found: 30403', 'Discovered: 2134343', 'Confirmed: 32443', 'Expected', 'Topped'],
//     datasets: [{
//       label: 'My First dataset',
//       backgroundColor: ['rgba(255, 99, 132, 0.2)', 'blue', 'orange', 'purple', 'yellow'],
//       data: [40, 10, 5, 2, 20]
//     }]
//   },

//   // Configuration options go here
//   options: {
//     cutoutPercentage: 50,
//     animation: {
//       animateScale: true
//     },
//     "responsive": true,
//     "maintainAspectRatio": false
//   }
// })


/////// example to get lat and long for a country !!!!!!!!!
// axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=Nigeria&key=AIzaSyDfxwu3-PAncezf5PNwdncW-p_AR-j-EdE")
//   .then((response) => {
//     return response
//   })
//   .then((data) => {
//     console.log(data.data.results[0].geometry.location);
//   })


// axios.get('https://api.covid19api.com/summary')
//   .then((response) => {
//     return response;
//   })
//   .then((data) => {
//     //console.log(data);
//     marker.addListener('click', function () {
//       let contentString = data.data.Global;
//       console.log(data.data)
//         let renderData = document.getElementById('renderData');

//         renderData.innerHTML = 
//         `
//         <p>New Confirmed: ${contentString['NewConfirmed']}</p>
//         `
//         //console.log(contentString);

//     });
//   })
//   .catch((error) => {
//     console.log(`Error: ${error}`);
//   })


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