// setting active class to navbar 
var navLink = document.querySelectorAll(".navbar .navbar-nav .nav-link")
var searchInput = document.getElementById("search")
var locationBtn = document.getElementById("get-location")
var mainApi = "" ;





navLink.forEach(a => {
    a.addEventListener('click', function () {
     navLink.forEach(nav => nav.classList.remove('active'));
     this.classList.add('active');
    });
});

// search
 searchInput.addEventListener('input' , function(){
    if(searchInput.value !== ""){
    var warningMsg = document.getElementById("warning")
    var searchTerm =searchInput.value.trim()
    warningMsg.classList.replace("d-block" ,"d-none")
    var apiLink = `https://api.weatherapi.com/v1/forecast.json?key=aa72fde2616843d8877142343240312&q=${searchTerm}&days=3` 
    
    }else{
        var warningMsg = document.getElementById("warning")
        apiLink = `https://api.weatherapi.com/v1/forecast.json?key=aa72fde2616843d8877142343240312&q=cairo&days=3`
        warningMsg.classList.replace("d-none" ,"d-block")
    }
    mainApi=apiLink;
    getApi()
});

// location 
locationBtn.addEventListener("click", function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var apiNavLink =  `https://api.weatherapi.com/v1/forecast.json?key=aa72fde2616843d8877142343240312&q=${latitude},${longitude}&days=3`
                mainApi= apiNavLink;     
            })
        getApi();
            
    }
})

// get api 
function getApi(){
    var httpReq = new XMLHttpRequest();
    httpReq.open("get" , mainApi);
    httpReq.responseType = "json";
    httpReq.send()
    httpReq.addEventListener("load" , function(){
    var weather = httpReq.response;

    // generate day 
    var CurrentDateObj = new Date(`${weather.forecast.forecastday[0].date}`)
    var currentDayIndex = CurrentDateObj.getDay();
    var nextDayIndex = currentDayIndex + 1 
    var upNextDayIndex = currentDayIndex + 2
    var weekDays = ["Sunday","Monday", "TuesDay","Wednesday","Thursday","Friday","Saturday"]
    var currentDay =weekDays[currentDayIndex]
    var nextDay = weekDays[nextDayIndex]
    var upNextDay = weekDays[upNextDayIndex]

    // display 
    var row = document.querySelector(".row")
    row.innerHTML= `
    <div class="one col col-lg-4 p-0 text-start">
        <span class="day d-block w-100 py-2 text-center">${currentDay} (${weather.forecast.forecastday[0].date})</span>
        <div class="current-content p-3">
        <div class="city fs-5 text-lead">${weather.location.name}</div>
        <div class="temp display-1 text-center fw-bold">${weather.current.temp_c}</div>
        <img class=" icon d-block" src=${weather.current.condition.icon} alt="weather-condition">
        <div class="condition text-info ps-4">${weather.current.condition.text}</div>
        <div class="data pb-4 pt-3">
        <span class="uv mx-2 text-lead"><img src="imgs/icon-umberella.png" alt="uv-rays" class="me-1">20%</span>
        <span class="wSpeed mx-2 text-lead"><img src="imgs/icon-wind.png" alt="wind-speed" class="me-1">${weather.forecast.forecastday[0].day.maxwind_kph}</span>
        <span class="Wdirection text-lead"><img src="imgs/icon-compass.png" alt="wind-direction" class="me-1">${weather.current.wind_dir}</span>
        </div>
        </div>
    </div>
    <div class="two  col col-lg-4 p-0">
        <span class="day d-block w-100 py-2">${nextDay}</span>
        <div class="forecast-content text-center p-5">
            <img class="icon" src=${weather.forecast.forecastday[1].day.condition.icon} alt="weather-condition">
            <div class="degree fs-3 fw-bold">${weather.forecast.forecastday[1].day.maxtemp_c}</div>
            <div class="low-deg fs-5">${weather.forecast.forecastday[1].day.mintemp_c}</div>
            <div class="condition text-info mt-4">${weather.forecast.forecastday[1].day.condition.text}</div>
        </div>
    </div>
    <div class="three  col col-lg-4 p-0">
        <span class="day d-block w-100 py-2">${upNextDay}</span>
        <div class="forecast-content text-center p-5">
            <img class="icon" src=${weather.forecast.forecastday[2].day.condition.icon} alt="weather-condition">
            <div class="degree fs-3 fw-bold">${weather.forecast.forecastday[2].day.maxtemp_c}</div>
            <div class="low-deg fs-5">${weather.forecast.forecastday[2].day.mintemp_c}</div>
            <div class="condition text-info mt-4">${weather.forecast.forecastday[2].day.condition.text}</div>
        </div>
    </div>
    `
    })
}