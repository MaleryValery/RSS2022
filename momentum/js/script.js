'use strict'

const time = document.querySelector('.time');
const date = document.querySelector('.date');

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
}
showTime();

/***********WEELCOME**********/





