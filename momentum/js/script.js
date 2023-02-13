'use strict'
/***********TIME**********/
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const showTime = function () {
    const dateTime = new Date();
    const currentTime = dateTime.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}
showTime();

/***********DATE**********/

const showDate = function(){
    
}