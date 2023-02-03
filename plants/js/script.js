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

    for (let i = 0; i < priceCard.length; i++) {
        if (!priceCard[i].hasAttribute('open') || event.target == priceCard[i]) continue;
        priceCard[i].removeAttribute('open');
    }
}
priceMod.forEach(card => {
    card.addEventListener('toggle', checkOpen)
})

//Select office Contact us Section
const mainFielCity = document.querySelector('.contact-city');
const listOfCitys = document.querySelector('.contact-dropdown__options');
// const arrowIcon = document.querySelector(".contact-options__item-arrow")
// const activIcon = document.querySelector(".contact-options__item-icon")

const openList = function (event) {
    listOfCitys.classList.toggle('drop_activ');
    mainFielCity.classList.toggle('city_activ');
    console.log(event);
    // arrowIcon.classList.toggle('arrow_activ');
    // activIcon.classList.toggle('icon_activ');
    // if(!event.target.mainFielCity || !event.target.listOfCitys){


}

const closeList = function (event) {
    if (event.target !== mainFielCity || event.target !== listOfCitys) {
        listOfCitys.classList.remove('drop_activ');
        mainFielCity.classList.remove('city_activ');
    }
}
mainFielCity.addEventListener('click', openList)
listOfCitys.addEventListener('click', openList)
document.addEventListener('click', closeList)



//ServiceSection
const buttons = document.querySelector('.service-buttons');
const arrayBtn = document.querySelectorAll('.service-buttons__btn');
const arrayCard = document.querySelectorAll('.service-cart');


const activeBtn = function (i) {
    arrayBtn.forEach(btn => {
        btn[i].classList.toggle('active')
    })
}

//показываю все карточки
const showAllCarts = function () {
    arrayCard.forEach(card => {
        card.classList.remove('blur');
    });
}
//скрываю только при клике 
const hideCarts = function () {
    arrayCard.forEach(card => {
        card.classList.add('blur');
    });
}

showAllCarts();

buttons.addEventListener('click', (event) => {
    const target = event.target;
    // const targetClass = target.classList[2];
    let indexArr = [];
    if (target && target.classList.contains('service-buttons__btn')) {
        target.classList.toggle('active');
        arrayBtn.forEach(item => {
            if (item.classList.contains('active')) {
                indexArr.push(item.classList[2])
            }
        });
        console.log(indexArr);
        if (indexArr.length === 2) {
            arrayBtn.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.disabled = true;
                    item.classList.add('block')
                }
            })
        } else {
            arrayBtn.forEach(item => {
                item.disabled = false;
                item.classList.remove('block')
            })
        };
        hideCarts();
        indexArr.forEach(item => {
            arrayCard.forEach(card => {
                if (card.classList.contains(item)) {
                    card.classList.remove('blur');
                }
            });
        })
        if (indexArr.length === 0) {
            showAllCarts();
        }
    }
});