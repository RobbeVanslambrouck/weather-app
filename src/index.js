import { header, footer, main } from './commenElements';
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
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`,
    {
      mode: 'cors',
    },
  ).then(validateHttpRequest);
  return location;
}

const WeatherBoard = (() => {
  const board = document.createElement('div');
  board.className = 'weatherBoard';

  return board;
})();

// temp: in kelvin
const WeatherAtCard = (
  location = '',
  desc = '',
  temp = 0,
  unit = 'celcius',
) => {
  const kelvin = temp;
  const celcius = temp - 273.15;
  const fahrenheit = temp * (9 / 5) - 459.67;

  let currentUnit = unit;
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

  const getCard = () => {
    const card = document.createElement('div');
    const weatherInfo = document.createElement('div');
    const weatherlocation = document.createElement('p');
    weatherlocation.textContent = location;
    const weatherDesc = document.createElement('p');
    weatherDesc.textContent = desc;
    const tempText = document.createElement('p');
    tempText.textContent = `${Math.round(displayTemp)}${displaySym}`;
    weatherInfo.append(weatherlocation, weatherDesc, tempText);

    const cardControls = document.createElement('div');
    const btnChangeUnit = document.createElement('button');
    btnChangeUnit.textContent = 'change Unit';
    btnChangeUnit.onclick = () => {
      currentUnit = changeTo[currentUnit];
      changeUnit(changeTo[currentUnit]);
      tempText.textContent = `${Math.round(displayTemp)}${displaySym}`;
    };
    cardControls.append(btnChangeUnit);
    card.append(weatherInfo, cardControls);
    return card;
  };

  return { getCard, desc };
};

function displayWeather(json, location = '', country = '') {
  const { temp } = json.main;
  const { description } = json.weather[0];
  let unit = 'celcius';
  if (country === 'US') {
    unit = 'fahrenheit';
  }
  const weatherCard = WeatherAtCard(location, description, temp, unit);
  WeatherBoard.innerHTML = '';
  WeatherBoard.append(weatherCard.getCard());
}

const LocationForm = (() => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const btnSubmit = document.createElement('button');
  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!input.value) {
      return;
    }

    let response = await getGeoLocation(input.value);
    const { lat, lon, name, country } = response[0];
    response = await getWeather(lat, lon);
    displayWeather(response, name, country);
  };
  btnSubmit.textContent = 'search';

  form.append(input, btnSubmit);
  return form;
})();

async function app() {
  document.body.append(header.getHeader('weather at'), main, footer);

  main.append(LocationForm, WeatherBoard);

  let response = await getGeoLocation('london');
  const { lat, lon, name } = response[0];
  response = await getWeather(lat, lon);
  displayWeather(response, name);
}

app();
