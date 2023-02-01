"use strict"
//Burger
const mobileNav = document.querySelector(".mobile-nav");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header-nav");
const body = document.querySelector("body");
const overBody = document.querySelector(".overlay");

const openBurger = function () {
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
mobileNav.addEventListener("click", closeBurger);

//Order Buttom Prices Section
const priceMod = document.querySelectorAll('.price-options__items');

const checkOpen = function (event) {
    if (!event.target.open) return; 
        let priceCard = event.target.parentNode.children;
        console.log(priceCard);
        for (let i = 0; i < priceCard.length; i++) {
            if (priceCard[i].tagName != "DETAILS" || !priceCard[i].hasAttribute('open') || event.target == priceCard[i]) continue;
            priceCard[i].removeAttribute('open');
        }
}
for (let i = 0; i <priceMod.length; i++ ){
    priceMod[i].addEventListener('toggle', checkOpen)
}