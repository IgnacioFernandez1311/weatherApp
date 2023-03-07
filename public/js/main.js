
const api = {
    key :  'd0257bf362b0ea8775daf36913c4e833',
    baseurl : 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode === 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

const getResults = (query) => {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
        return weather.json();
    }).then(displayResults);
}

const displayResults = (weather) => {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>ºc</span>`;

    let weatherType = document.querySelector('.current .weather');
    weatherType.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.current .hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_min)}ºc / ${Math.round(weather.main.temp_max)}ºc`;
}

const dateBuilder = (date) => {
    let months = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[date.getDate()];
    let currentDate = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${day} ${currentDate} ${month} ${year}`;
}