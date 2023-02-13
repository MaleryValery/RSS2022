'use strict'

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector(".greeting");
const inputName = document.querySelector('.name');
/***********WEELCOME**********/
const showGreeting = function () {
    greeting.textContent = `Good ${getTimeOfDay()}`

}
const getTimeOfDay = function () {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 6) return 'Night';
    else
    if (hours >= 6 && hours < 12) return 'Morning';
    else
    if (hours >= 12 && hours < 18) return 'Afternoon';
    else
    if (hours >= 18 && hours < 24) return 'Evening';
}

function setLocalStorage() {
    localStorage.setItem('inputName', inputName.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('inputName')) {
        inputName.value = localStorage.getItem('inputName');
    }
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