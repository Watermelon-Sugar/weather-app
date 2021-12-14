const toggle = document.getElementById('toggle');
const nav = document.getElementById('nav');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const errorMes = document.getElementById('alert');
const weatherInfo = document.getElementById('weatherInfo');

toggle.addEventListener('click', () => nav.classList.toggle('active'));


searchBtn.addEventListener('click', (e)=> {
        e.preventDefault();
         console.log(search.value);
        weatherForecast();
});


search.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13 ) {
        evt.preventDefault();
        console.log(search.value);
        weatherForecast();
    }
}


const api = {
    key: "dfd961668cc40d0df5ea51bfce7b833a",
    base: "https://api.openweathermap.org/data/2.5/forecast"
};

const  weatherForecast = async () => {
   
    if (search.value) {
        
       
        errorMes.innerHTML = "";
        weatherInfo.style.display = "flex";

        const res = await fetch(`${api.base}?q=${search.value}&units=metric&cnt=1&appid=${api.key}`);

        const data =  await res.json();

        showWeather(data);
        
        console.log(data);
        
        return data;    

            
    } else {

        errorMes.innerHTML = `<p>Input a valid city</p>`;

        errorMes.style.fontSize = "20px";
        errorMes.style.display = "flex";
        errorMes.style.justifyContent = "center";
        errorMes.style.paddingTop = "20px";
        errorMes.style.alignItems = "center";
        
        weatherInfo.style.display = "none";
    }
};



function showWeather(data) { 

    console.log(data.city);
    const cityEl = document.querySelector('.location');
    cityEl.innerHTML = `${data.city.name}`;


    const day = new Date();
    let date = day.getMonth() + '-' + day.getDate();
    let time = day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();
    let today = date + ' <br> ' + time;
    document.querySelector('.date').innerHTML = today;


    const tempEl = document.querySelector('.temp');
    tempEl.innerHTML = `<p>Weather today: ${Math.round(data.list[0].main.temp)}<span>°C</span></p>
    <p>Feels like: ${Math.round(data.list[0].main.feels_like)}<span>°C</span></p>`;


    const weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" width="40%"> <p>${data.list[0].weather[0].description}</p>`;
    weatherEl.style.textTransform = "capitalize";


    const humidityEl = document.querySelector('.humidity');
    humidityEl.innerHTML = `<p>Humidity: ${Math.round(data.list[0].main.humidity)}<span>%</span></p>`;

    const windEl = document.querySelector('.wind');
    windEl.innerHTML = `<p>Deg: ${data.list[0].wind.deg} °</p>
    <p>Gust: ${data.list[0].wind.gust} km/h</p>
    <p>Speed: ${data.list[0].wind.speed} km/h</p>`;

}