import countries from "./fetchCountries.js";
import countryCardTpl from "../src/country.hbs";
import '../src/styles.css'
const debounce = require("lodash.debounce");
import { alert, defaultModules } from '.././node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '.././node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';

defaults.styling = 'material';
defaults.icons = 'material';

const cardContainerRef = document.querySelector('.countries-cards-container');
const searchRef = document.querySelector('.js-input');

searchRef.addEventListener('input', 
    debounce(()=> {    
    const searchQuery = searchRef.value;
    console.log(searchQuery)

    countries.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(errorFetch)
}, 2000)
)

function renderCountryCard(country) {
  if(country.length >= 10) {
    defaultModules.set(PNotifyMobile, {});

  alert({
    text: 'Too many matches found!'
  });
}
    const markup = countryCardTpl(...country);
    cardContainerRef.innerHTML = markup;
}

function errorFetch(error) {
    alert ('You enter an undefiend country')
}
