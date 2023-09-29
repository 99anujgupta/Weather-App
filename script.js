var input_box = document.getElementById('input-box');
const search_btn = document.getElementById('search_btn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description= document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const weather_details =document.querySelector('.weather-details');


async function checkWeather(city){
   const api_key = "15f2ea40ef99ed29a51ae97dd0f97b0c";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

   const weather_data = await fetch(`${url}`).then(response => response.json());

   console.log(weather_data);

   if(weather_data.cod === `404`){
    // console.log('error');
    location_not_found.style.display ="flex";
    weather_body.style.display="none";
    weather_details.style.display ="none";

    return;
   }
   weather_body.style.display="flex";
   location_not_found.style.display ="none";
   weather_details.style.display ="flex";

   temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;
   description.innerHTML = `${weather_data.weather[0].description}`;
   humidity.innerHTML =`${weather_data.main.humidity}%`;
   wind_speed.innerHTML = `${weather_data.wind.speed}KM/H`;

   switch(weather_data.weather[0].main){
    case 'Clouds': 
         weather_img.src="images/cloud.png";
         break;
     case 'Clear': 
          weather_img.src="images/clear.png";
          break;
    case 'Mist':
        weather_img.src="images/mist.png"; 
        break;
    case 'Snow':
        weather_img.src="images/snow.png"; 
        break;
    case 'Rain':
        weather_img.src="images/rain.png"; 
        break;

   }
   
}

search_btn.addEventListener('click', ()=>{
    checkWeather(input_box.value);
});

