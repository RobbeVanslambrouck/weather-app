(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

const API_KEY = '609792093f4e99ef7fccf02e63687043';

fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid={${API_KEY}}`,
  {
    mode: 'cors',
  }
)
  .then((value) => {
    if (value.ok) {
      Promise.resolve(value);
    }
    const msg = 'status text: ' + value.statusText;
    Promise.reject(msg);
  })
  .catch((err) => {
    console.log(err);
  });
// fetch(
//   'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}'
// );


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBLHdFQUF3RSxFQUFFLFNBQVM7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLDJEQUEyRCxJQUFJLE1BQU0sSUFBSSxRQUFRLFFBQVE7QUFDekYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBUElfS0VZID0gJzYwOTc5MjA5M2Y0ZTk5ZWY3ZmNjZjAyZTYzNjg3MDQzJztcblxuZmV0Y2goXG4gIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPUxvbmRvbiZsaW1pdD0xJmFwcGlkPXske0FQSV9LRVl9fWAsXG4gIHtcbiAgICBtb2RlOiAnY29ycycsXG4gIH1cbilcbiAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlLm9rKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpO1xuICAgIH1cbiAgICBjb25zdCBtc2cgPSAnc3RhdHVzIHRleHQ6ICcgKyB2YWx1ZS5zdGF0dXNUZXh0O1xuICAgIFByb21pc2UucmVqZWN0KG1zZyk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSk7XG4vLyBmZXRjaChcbi8vICAgJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD17bGF0fSZsb249e2xvbn0mYXBwaWQ9e0FQSV9LRVl9J1xuLy8gKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==