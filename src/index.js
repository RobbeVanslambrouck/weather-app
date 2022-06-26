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

function displayWeather(json) {
  console.log(json);
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

// getGeoLocation('london')
//   .then((response) => {
//     const { lat } = response[0];
//     const { lon } = response[0];
//     getWeather(lat, lon).then(displayWeather);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

document.body.append(header.getHeader('weather at'), main, footer);
