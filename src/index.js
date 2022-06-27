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

document.body.append(header.getHeader('weather at'), main, footer);

const LocationForm = (() => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const btnSubmit = document.createElement('button');
  btnSubmit.textContent = 'search';

  form.append(input, btnSubmit);
  return form;
})();

// temp: in kelvin
const WeatherAtCard = (desc = '', temp = 0) => {
  const kelvin = temp;
  const celcius = temp - 273.15;
  const fahrenheit = temp * (9 / 5) - 459.67;
  let current = 'celcius';
  let displayTemp = celcius;
  let displaySym = '°C';
  const changeTo = {
    celcius: 'fahrenheit',
    fahrenheit: 'kelvin',
    kelvin: 'celcius',
  };
  const getCard = () => {
    const card = document.createElement('div');
    const weatherInfo = document.createElement('div');
    const weatherDesc = document.createElement('p');
    weatherDesc.textContent = desc;
    const tempText = document.createElement('p');
    tempText.textContent = `${Math.round(celcius)}°C`;
    weatherInfo.append(weatherDesc, tempText);

    const cardControls = document.createElement('div');
    const btnChangeUnit = document.createElement('button');
    btnChangeUnit.textContent = 'change Unit';
    btnChangeUnit.onclick = () => {
      current = changeTo[current];
      console.log(current);

      if (current === 'celcius') {
        displayTemp = celcius;
        displaySym = '°C';
      }
      if (current === 'fahrenheit') {
        displayTemp = fahrenheit;
        displaySym = '°F';
      }
      if (current === 'kelvin') {
        displayTemp = kelvin;
        displaySym = 'K';
      }
      tempText.textContent = `${Math.round(displayTemp)}${displaySym}`;
    };
    cardControls.append(btnChangeUnit);
    card.append(weatherInfo, cardControls);
    return card;
  };

  return { getCard, desc };
};

let weatherCard = WeatherAtCard();

function displayWeather(json) {
  console.log(json);
  const { temp } = json.main;
  const { description } = json.weather[0];
  weatherCard = WeatherAtCard(description, temp);
  main.innerHTML = '';
  main.append(LocationForm, weatherCard.getCard());
}

getGeoLocation('london')
  .then((response) => {
    const { lat } = response[0];
    const { lon } = response[0];
    getWeather(lat, lon).then(displayWeather);
  })
  .catch((err) => {
    console.log(err);
  });

main.append(LocationForm);
