'use strict'
const body = document.querySelector('.body');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const greeting = document.querySelector(".greeting");
const inputName = document.querySelector('.name');

const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = Math.floor(Math.random() * (Math.floor(20) - Math.ceil(1) + 1) + 1);


const cityInput = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtm = document.querySelector('.change-quote');

const todoBox = document.querySelector('.todo-box');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoEl = document.querySelector('.todo-element');

/***********WELCOME**********/
const showGreeting = function () {
    greeting.textContent = `Good ${getTimeOfDay()}`

}
const getTimeOfDay = function () {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 6) return 'night';
    else
    if (hours >= 6 && hours < 12) return 'morning';
    else
    if (hours >= 12 && hours < 18) return 'afternoon';
    else
    if (hours >= 18 && hours < 24) return 'evening';
}
// save data from user
function setLocalStorage() {
    localStorage.setItem('inputName', inputName.value);
    localStorage.setItem('cityInput', cityInput.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('inputName') || localStorage.getItem('cityInput')) {
        inputName.value = localStorage.getItem('inputName');
        cityInput.value = localStorage.getItem('cityInput') || "Minsk";
    }
    getWeather();
}
window.addEventListener('load', getLocalStorage)

/***********DATE**********/
const showDate = function () {
    const options = {
        weekday: "long",
        month: 'long',
        day: 'numeric',
        year: "numeric",
    };
    const dateCurrent = new Date().toLocaleDateString('en-IL', options)
    date.textContent = dateCurrent;
}
/***********TIME**********/
const showTime = function () {
    const dateTime = new Date();
    const currentTime = dateTime.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}
showTime();

/***********SLIDER**********/
// const getRandomNum = function () {
//     return Math.floor(Math.random() * (Math.floor(20) - Math.ceil(1) + 1) + 1);
// }
const setBg = function () {

    let imgNum = randomNum;
    imgNum = imgNum < 10 ? `0${imgNum}` : imgNum;
    console.log(imgNum);
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${imgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${imgNum}.jpg')`;

    }
}
setBg();

const getSlideNext = function () {
    if (randomNum < 20) randomNum++;
    else if (randomNum == 20) randomNum = 1;
    setBg();

}
const getSlidePrev = function () {
    if (randomNum == 1) randomNum = 20;
    else if (randomNum <= 20) randomNum--;
    setBg();
}
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

/***********WEATHER**********/
async function getWeather() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value||"Minsk"}&lang=en&appid=002512f8931f93e1923f36b22a7cb520&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();

        weatherError.textContent = null;
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    } catch (error) {
        weatherError.textContent = `Error! city not found for ${cityInput.value}`
        weatherIcon.removeAttribute("class");
        temperature.textContent = null;
        weatherDescription.textContent = null;
        wind.textContent = null;
        humidity.textContent = null;
    }
   // console.log(cityInput.value);
}

cityInput.addEventListener('change', getWeather);

/***********Phrases**********/
async function getQuotes() {  
// const quotes = 'https://api.quotable.io/random'
    const quotes = './assets/text/quotes_en.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
   // console.log(data);
    let randomQ = Math.floor(Math.random() * (Math.floor(90) - Math.ceil(0) + 0) + 1);
    quote.textContent = `"${data[randomQ].quote}"`;
    author.textContent =  data[randomQ].author;
    console.log( quote.textContent , author.textContent);
  }

  getQuotes();
  changeQuoteBtm.addEventListener('click', getQuotes);

  /***********TODO**********/

