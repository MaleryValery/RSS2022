'use strict'
import playList from './playList.js';
console.log(playList);

const todoBox = document.querySelector('.todo-box');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoEl = document.querySelector('.todo-element');

/***********Translate**********/
let greetingTranslation = {
    'en': "Good",
    'ru': "Добрый",
}
console.log();
/***********WELCOME**********/

const body = document.querySelector('.body');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const showGreeting = function (lg = 'en') {
    lg === 'en' ?  greeting.textContent = `${greetingTranslation.en} ${getTimeOfDay()}`:
    greeting.textContent = `${greetingTranslation.ru} ${getTimeOfDay()}`

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

const greeting = document.querySelector(".greeting");
const inputName = document.querySelector('.name');

const showDate = function (lg = 'en') {
    const options = {
        weekday: "long",
        month: 'long',
        day: 'numeric',
        year: "numeric",
    };
    const dateCurrent = new Date().toLocaleDateString(`${lg}-IL`, options)
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

const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = Math.floor(Math.random() * (Math.floor(20) - Math.ceil(1) + 1) + 1);

const getRandomNum = function () {
    return Math.floor(Math.random() * (Math.floor(20) - Math.ceil(1) + 1) + 1);
}

const setBg = function () {

    let imgNum = randomNum;
    imgNum = imgNum < 10 ? `0${imgNum}` : imgNum;
    console.log(imgNum);
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/MaleryValery/stage1-tasks/assets/images/${getTimeOfDay()}/${imgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/MaleryValery/stage1-tasks/assets/images/${getTimeOfDay()}/${imgNum}.jpg')`;
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

/***********SLIDER_API**********/
/*
async function getLinkToUnsplash(){
    let urlImg = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=EHqMbnz9CSwoXZwHQMmfXNjAUj5DbgQQj4kv6OhOW0w`;
    const res = await fetch(urlImg);
    const data = await res.json();
    console.log(data.urls.regular);
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
        body.style.backgroundImage = `url(${data.urls.regular})`;
    }

}
getLinkToUnsplash();

slideNext.addEventListener('click', getLinkToUnsplash);
slidePrev.addEventListener('click', getLinkToUnsplash);
*/
/*
async function getLinkToFlickr(){
    let urlImg = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c93ff28dc401e3301772e4b894351baf&tags=${getTimeOfDay()}nature&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(urlImg);
    const data = await res.json();
    console.log(data.photos.photo[randomQ].url_l);
    const img = new Image();
    img.src = data.photos.photo[randomQ].url_l;
    img.onload = () => {
        body.style.backgroundImage = `url(${data.photos.photo[randomQ].url_l})`;
    }

}
getLinkToFlickr();

slideNext.addEventListener('click', getLinkToFlickr);
slidePrev.addEventListener('click', getLinkToFlickr);
*/
/***********WEATHER**********/
const cityInput = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

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
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
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

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtm = document.querySelector('.change-quote');

async function getQuotes() {

    let randomQ = Math.floor(Math.random() * (Math.floor(98) - Math.ceil(0) + 0) + 1);
    // const quotes = 'https://api.quotable.io/random'
    const quotes = './assets/text/dataEN.json';
    const res = await fetch(quotes);
    const data = await res.json();

    quote.textContent = `"${data[randomQ].quote}"`;
    author.textContent = data[randomQ].author;

    //console.log( quote.textContent , author.textContent);
}

getQuotes();
changeQuoteBtm.addEventListener('click', getQuotes);


/***********PLAYER**********/

const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector(".play-list");
const playItem = document.querySelector('.play-item');


let playNum = 0; // номер песни при загрузке
let isPlay = false; // флаг играет ли песня
let audioArr = []; // массив для определения активной песни



const myAudio = new Audio();
let audioTime = Math.round(myAudio.currentTime); // Получаем значение на какой секунде песня
let audioLength = Math.round(myAudio.duration); // Получаем всё время песни

const loadAudio = function (playNum) {
    myAudio.src = playList[playNum].src; // указываем какую песню играть
}
loadAudio(playNum);

//myAudio.currentTime = 0; 

//проверяем кончилась ли песня, если кончиласть, то запускаем следующую
if (audioTime == audioLength && playNum < 3) {
    playNum++;
    console.log(playNum);
    playAudio();
} else if (audioTime === audioLength && playNum === 3) {
    playNum = 0;
    console.log(playNum);
    playAudio();
}

playList.forEach((el, i) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[i].title;
    playListContainer.append(li);
    audioArr.push(li);
})

const playAudio = () => {
    // loadAudio(playNum);
    audioArr[playNum].classList.add("item-active")
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
    myAudio.play();
    isPlay = true;
}

const pauseAudio = () => {
    myAudio.pause();
    isPlay = false
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
    audioArr[playNum].classList.remove("item-active");
};


const playNext = () => {
    audioArr[playNum].classList.remove("item-active");
    if (playNum === 3) {
        playNum = 0;
    } else playNum++;
    console.log(playNum);
    loadAudio(playNum);
    playAudio()
}
const playPrev = () => {
    audioArr[playNum].classList.remove("item-active");
    if (playNum === 0) {
        playNum = 3;
    } else playNum--;
    console.log(playNum);
    loadAudio(playNum);
    playAudio()
}
playBtn.addEventListener('click', function () {
    isPlay ? pauseAudio() : playAudio();
    //  myAudio.paused ? playAudio() : pauseAudio();
})
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);
myAudio.addEventListener('ended', playNext);
/***********TODO**********/


/***********Settings**********/
const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
  }