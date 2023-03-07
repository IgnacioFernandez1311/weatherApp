
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
    date.innerHTML = now.toLocaleDateString('en-US', {
        weekday : 'long',
        day : 'numeric',
        month : 'long',
        year : 'numeric'
    });

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>ºc</span>`;

    let weatherType = document.querySelector('.current .weather');
    weatherType.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.current .hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_min)}ºc / ${Math.round(weather.main.temp_max)}ºc`;
}