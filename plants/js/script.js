"use strict"


/*******************************/
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


/*******************************/
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



/*******************************/
//ServiceSection
const buttons = document.querySelector('.service-buttons');
const arrayBtn = document.querySelectorAll('.service-buttons__btn');
const arrayCard = document.querySelectorAll('.service-cart');


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

//Select office Contact us Section
const mainFielCity = document.querySelector('.contact-city');
const listOfCities = document.querySelector('.contact-dropdown__options');
const arrCities = document.querySelectorAll('.contact-dpopdown__item');
const arrowCity = document.querySelector('.contact-options__item-arrow');
const iconCity = document.querySelector('.contact-options__item-icon');
const form = document.querySelector('.contact-form');
const formCity = document.querySelector(".contact-city-form");
const formPhone = document.querySelector(".contact-phone");
const formAddress = document.querySelector(".contact-address");
const callEl = document.querySelector('.contact-callus');

const listOffices = {
    "Canandaigua, NY": {
        city: "Canandaigua, NY",
        Phone: "+1	585	393 0001",
        address: "151 Charlotte Street",
    }

    ,
    "New York City": {
        city: "New York City",
        Phone: "+1	212	456 0002",
        address: "9 East 91st Street",
    },
    "Yonkers, NY": {
        city: "Yonkers, NY",
        Phone: "+1	914	678 0003",
        address: "511 Warburton Ave",
    },
    "Sherrill, NY": {
        city: "Sherrill, NY",
        Phone: "+1	315	908 0004",
        address: "14 WEST Noyes BLVD",
    },
}

const openList = function (event) {
    listOfCities.classList.toggle('drop_activ');
    mainFielCity.classList.toggle('city_activ');
    arrowCity.classList.toggle('arrow_activ');
    iconCity.classList.toggle('icon_activ');


    console.log(event);
}


// const closeList = function (event) {
//     if (event.target !== mainFielCity || event.target !== listOfCitys) {
//         listOfCitys.classList.remove('drop_activ');
//         mainFielCity.classList.remove('city_activ');
//     }
// }
mainFielCity.addEventListener('click', openList)
listOfCities.addEventListener('click', (event) => {

    arrCities.forEach(elem => {
        elem.addEventListener("click", (event) => {
            mainFielCity.textContent = elem.innerHTML;
            form.style.display = "block";
            listOfCities.classList.remove('drop_activ');
            formCity.textContent =  listOffices[elem.textContent].city;
            formPhone.textContent = listOffices[elem.textContent].Phone;
            formAddress.textContent = listOffices[elem.textContent].address
            callEl.setAttribute('href', "tel:"+  listOffices[elem.textContent].Phone)
            console.log(listOffices);
        })
    })
})

//document.addEventListener('click', closeList)