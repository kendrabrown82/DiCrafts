let map;
//array to store country information from covid api call
const countryData = [];
//array to store any overlay on the map such as markers and circles
const overLay = [];

//main Google Maps call
function initMap() {
  var myLatLng = {
    lat: 29.7604,
    lng: -95.3698
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
  
  const tButton = document.getElementById("toggleCircles");
  tButton.addEventListener("click", function() {
    toggleCircles(overLay);
  });

 
  // -------- COVID and Google Maps API to Draw Circles -------- //
  axios.get('https://api.covid19api.com/summary')
    .then((response) => {
      return response;
    })
    // returning data and storing it in the countryData array
    .then((data) => {
      countryData.push(data.data.Countries);
      console.log(data.data);
      //object to store global stats
      globalInfo = {
        'Total Confirmed': data.data.Global['TotalConfirmed'],
        'Total Deaths': data.data.Global['TotalDeaths'],
        'Total Recovered': data.data.Global['TotalRecovered']
      }

      //draw pie chart of world wide totals
      drawChart(globalInfo, 'doughnut', 'grandTotals', true, '');

      for (let c in countryData[0]) {
        // getting the slug/country name in order to make another request
        //console.log(countryData[0][c]['Slug']);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${countryData[0][c]['Slug']}&key=AIzaSyAOntje_nb9MDRE2p9-b6H2uBtqwSDCT0g`)
          .then((lData) => {
            return lData;
          })
          .then((lResp) => {
            // combining data from countryData array and google geocode request to get country name, total confirmed, and lat/long
            //console.log(countryData[0][c]['Country'], countryData[0][c]['TotalConfirmed'], lResp.data.results[0].geometry.location);

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


  // ------------ Country Search ------------ //
  let searchButton = document.getElementById('searchButton')
  searchButton.addEventListener('click', function () {
    let country = document.getElementById('countrySearch').value;
    if (country === '') {
      alert("Please entry a country...");
    } else {
      country = country.replace(/\s+/g, '-').toLowerCase();
    }
    //hide existing circle
    hideCircles(overLay);

    axios.get(`https://api.covid19api.com/summary`)
      .then((response) => {
        return response;
      })
      .then((data) => {
        let contentString = data.data.Countries;
        let countryData = contentString.find(search => country == search.Slug)

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
      
  }) // <---- End of Search Country Call


  // -------- Request to get World Totals -------- //
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

  //---- Draw circles on map based on lat/long coords and Total Confirmed(drawValue) ----//
  function drawCircles(coords, drawValue) {

    const cityCircle = new google.maps.Circle({
      strokeColor: "white",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "red",
      fillOpacity: 0.35,
      map,
      center: coords,
      radius: Math.sqrt(drawValue) * 750,
      clickable: true
    });

    //push circle drawn on map to overLay array
    overLay.push(cityCircle);
    //console.log(overLay);
    console.log(cityCircle.visible);

    //create div structure for line chart in infowindow in google maps by adding "canvas" child element
    const infoWindowNode = document.createElement('div');
    const node = document.createElement('canvas');
    node.setAttribute("id", "monthComparison");
    infoWindowNode.appendChild(node);

    //create new infowindow using set up above
    var infowindow = new google.maps.InfoWindow({
      content: infoWindowNode
    });

    //adding event listener for info window to pop up and call getDat() to gather monthly data and draw chart by passing in country value
    cityCircle.addListener('click', function () {
      infowindow.setPosition(cityCircle.center)
      infowindow.open(map);
      getDat(document.getElementById('countrySearch').value);
    });

    

  } // <-- draw circle


  //--------- Remove Circles On Map --------//
  function hideCircles(arr) {
    for (let g = 0; g < arr.length; g++) {
      arr[g].setOptions({
        visible: false
      });
    }
  }

  //-------- Toggle Circle Viewability --------//
  function toggleCircles(arr) {
    for (let h = 0; h < arr.length; h++) {
      if(arr[h].visible === true) {
        arr[h].setOptions({ visible: false });
        tButton.innerText = "Show All";
      } else {
        arr[h].setOptions({ visible: true });
        tButton.innerText = "Hide All";
      }
    }
  }

} // <-- initMap()


// ------------  Draw Chart ------------ //
//Passes in an object of data, type of chart to draw , DOM element, boolean value to  respect aspect ratio due to canvas div requirements, and label
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
        //colors for all the charts, please change them to ones better suited
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(65,105,225, 0.5)', 'rgba(255,153,51, 0.5)', 'rgba(255,255,0, 0.5)', 'rgba(0,128,0, 0.5), rgba(0,153,76, 0.5)', 'rgba(153,0,153, 0.5)', 'rgba(255,20,147, 0.5)', 'rgba(165,42,42, 0.5)', 'rgba(64,224,208, 0.5)', 'rgba(255, 218, 185, 0.5)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(65,105,225)', 'rgb(255,153,51)', 'rgb(255,255,0)', 'rgb(0,128,0), rgb(0,153,76)', 'rgb(153,0,153)', 'rgb(255,20,147)', 'rgb(165,42,42)', 'rgb(64,224,208)', 'rgb(255, 218, 185)'],
        borderWidth: 2,
        data: Object.values(anObject)
      }]
    },

    // Configuration options go here
    options: {
      animation: {
        animateScale: true
      },
      "responsive": true,
      "maintainAspectRatio": aspectRatio,

      legend: {
        labels: {
            boxWidth: 30,
            fontSize: 20
        }  
      }
    } // <-- options

  })

}

// ------------  Get Country Monthly Totals and Draw Line Chart ------------ //
//A bit of a cluster as various attempts and configurations were tried. Need to come back and refactor when time permits. Ended up using async function and waiting for the multiple get calls to resolve before doing anything with data. Without it, it was populating all the information. Le sigh.

async function getDat(getCountry) {
  const monthsArr = ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];
  //array to store the promises
  promiseArr = [];
  //object to store the monthly totals and pass to drawChart()
  const objTest = {};
  let tempVar = '';

  for (let i = 1; i <= monthsArr.length; i++) {
    promiseArr.push(axios.get(`https://covid-api.com/api/reports?date=2020-0${i}-01&q=${getCountry}`));
  }
  //another reason to wait and get a Promise.all() is so the calls are made in the expected order of months so we don't need to attempt to sort whatever return we get from the promise
  const collect = await Promise.all(promiseArr);
  for (let j = 0; j < collect.length; j++) {
    //testing if data found was null/unidentified cause it would stop unless checking
    if (collect[j].data.data[0] == null) {
      console.log("found another undefined item...ignore");
    } else {
      tempVar = collect[j].data.data[0].date;
      objTest[tempVar] = collect[j].data.data[0].confirmed;
    }
    //console.log(objTest);
  }

  drawChart(objTest, 'line', 'monthComparison', true, 'Monthly Confirmed Totals');
} // <--- getDat()