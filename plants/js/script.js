"use strict"
console.log(`самостоятельная оценка 100\nВёрстка валидная +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css + 12\nИнтерактивность, реализуемая через css +20`)

const mobileNav = document.querySelector(".mobile-nav");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header-nav");
const body = document.querySelector("body");
const overBody = document.querySelector(".overlay");

const openBurger =  function () {
    mobileNav.classList.toggle("_active");
    burger.classList.toggle("_active");
    body.classList.toggle('overlay');
};

const closeBurger = function () {
    mobileNav.classList.remove("_active");
    burger.classList.remove("_active");
    body.classList.remove('overlay');
};

burger.addEventListener("click", openBurger);
menu.addEventListener("click", closeBurger);
mobileNav.addEventListener ("click", closeBurger);
