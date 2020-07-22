
    const apiKey = '7be341ddd5b59ee44a44b57480ada5f5';
    const unSplashKey = 'd1qBOH5MPAW7dwZK5tz6WauWK0jQxz7Kz2-X2WdKUtM';
    const button = document.getElementById("search-button");
    var infoBody = document.getElementById("weatherinfo");


    // Search by City button
    button.addEventListener('click', function() {
        let dropdown = document.getElementById("dropdown");
        let searchType = dropdown.options[dropdown.selectedIndex].value;
        let searchValue = document.getElementById("search-query").value;
        let searchQuery = '';
        // console.log(searchValue);
        // console.log(searchType);

        //refactor all this
        if (searchValue === '') {
            alert("Please enter a city");
        }ß
        
        searchQuery = searchType === 'City' ? 'q' : 'zip';
       
        // Weather API Fetch
        fetch(`https://api.openweathermap.org/data/2.5/weather?${searchQuery}=${searchValue}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.main);
            getData(data);
        })
        .catch((err) => {
            console.log('Fetch Failure!');
            console.log(err);
        });
        
        // Unsplash API Fetch
        fetch(`https://api.unsplash.com/search/photos?query=${searchValue}&client_id=d1qBOH5MPAW7dwZK5tz6WauWK0jQxz7Kz2-X2WdKUtM`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            pickedImg = data.results[Math.floor(Math.random() * data.results.length)];
            var backURL = pickedImg.urls.regular;
            document.getElementById("weatherimg").style.backgroundRepeat = "no-repeat";
            document.getElementById("weatherimg").style.backgroundImage = `url(${backURL})`;
        })
            
        
        
    }); // <--- button eventlistener

    // ------------------ Functions --------------------------- //
    function getData(data) {   
        infoBody.innerHTML = '';
    
        var wInfo = 
            `   <h1 class="is-size-1 has-text-white">${data.name}</h1>
                <p class="is-size-2 has-text-white">Temp: ${data.main.temp}°F<p>
                <p class="is-size-2 has-text-white">Feels like: ${data.main.feels_like}°F | Humidity: ${data.main.humidity}% | Type: ${data.weather[0].description}</p>
            `  
        infoBody.innerHTML = wInfo;
    }      