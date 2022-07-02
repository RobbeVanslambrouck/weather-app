import { header, footer, main } from './commenElements';
import { dayIcons, nightIcons } from './images';
import './styles/style.css';

const API_KEY = '609792093f4e99ef7fccf02e63687043';

function validateHttpRequest(response) {
  if (response.ok) {
    return Promise.resolve(response.json());
  }
  const msg = `status text: ${response.statusText}`;
  return Promise.reject(msg);
}

function getWeather(lat, lon) {
  const weather = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    {
      mode: 'cors',
    },
  ).then(validateHttpRequest);
  return weather;
}

function getGeoLocation(cityName = 'Brussels') {
  const limit = 1;
  const location = fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`,
    {
      mode: 'cors',
    },
  ).then(validateHttpRequest);
  return location;
}

const WeatherBoard = (() => {
  const board = document.createElement('div');
  board.className = 'weather-board';

  return board;
})();

// temp: in kelvin
const WeatherAtCard = (weather = {}, location = {}) => {
  const { temp } = weather.main;
  const kelvin = temp;
  const celcius = temp - 273.15;
  const fahrenheit = temp * (9 / 5) - 459.67;

  let currentUnit = 'celcius';
  if (location.country === 'US') {
    currentUnit = 'fahrenheit';
  }

  let displayTemp;
  let displaySym;

  const changeUnit = (to) => {
    currentUnit = to;
    if (to === 'celcius') {
      displayTemp = celcius;
      displaySym = '°C';
    }
    if (to === 'fahrenheit') {
      displayTemp = fahrenheit;
      displaySym = '°F';
    }
    if (to === 'kelvin') {
      displayTemp = kelvin;
      displaySym = 'K';
    }
  };

  changeUnit(currentUnit);
  const changeTo = {
    celcius: 'fahrenheit',
    fahrenheit: 'kelvin',
    kelvin: 'celcius',
  };

  const getWeatherIcon = () => {
    const weatherIconId = weather.weather[0].id;
    const day =
      weather.sys.sunrise < weather.dt && weather.sys.sunset > weather.dt;
    if (day) {
      return dayIcons[weatherIconId];
    }
    return nightIcons[weatherIconId];
  };

  const getCard = () => {
    const card = document.createElement('div');
    card.className = 'current-weather-card';
    const weatherlocation = document.createElement('p');
    weatherlocation.className = 'location-name';
    weatherlocation.textContent = `${location.name}, ${location.country}`;
    const weatherDescIcon = document.createElement('img');
    weatherDescIcon.className = 'weather-icon';
    weatherDescIcon.alt = weather.description;
    weatherDescIcon.src = getWeatherIcon();
    const weatherDesc = document.createElement('p');
    weatherDesc.className = 'weather-description';
    weatherDesc.textContent = weather.weather[0].description;
    const tempText = document.createElement('p');
    tempText.className = 'temperature';
    tempText.textContent = `${Math.round(displayTemp)}${displaySym}`;
    card.append(weatherlocation, tempText, weatherDescIcon, weatherDesc);

    tempText.onclick = () => {
      currentUnit = changeTo[currentUnit];
      changeUnit(changeTo[currentUnit]);
      tempText.textContent = `${Math.round(displayTemp)}${displaySym}`;
    };
    return card;
  };

  return { getCard };
};

function displayWeather(weather, location) {
  const weatherCard = WeatherAtCard(weather, location);
  WeatherBoard.innerHTML = '';
  WeatherBoard.append(weatherCard.getCard());
}

const LocationForm = (() => {
  const form = document.createElement('form');
  form.className = 'location-form';
  const input = document.createElement('input');
  input.type = 'text';
  const btnSubmit = document.createElement('button');
  btnSubmit.className = 'search-btn fa-solid fa-magnifying-glass-location';
  const btnSubmitText = document.createElement('p');
  btnSubmitText.textContent = 'search';
  btnSubmitText.className = 'sr-only';
  btnSubmit.append(btnSubmitText);
  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!input.value) {
      return;
    }

    let response = await getGeoLocation(input.value);
    const { lat, lon, name, country } = response[0];
    response = await getWeather(lat, lon);
    displayWeather(response, { name, country });
  };

  form.append(input, btnSubmit);
  return form;
})();

async function app() {
  document.body.append(header.getHeader('weather at'), main, footer);

  main.append(LocationForm, WeatherBoard);
  const location = await getGeoLocation('london');
  const weather = await getWeather(location[0].lat, location[0].lon);
  displayWeather(weather, location[0]);
}

app();
