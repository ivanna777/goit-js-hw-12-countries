import countries from "./fetchCountries.js";
import countriesListTpl from "../src/countriesList.hbs";
import countryCardTpl from "../src/country.hbs";
import '../src/styles.css'
const debounce = require("lodash.debounce");
import { alert, defaultModules } from '.././node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '.././node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import 'material-design-icons/iconfont/material-icons.css';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';

defaults.styling = 'material';
defaults.icons = 'material';

const cardContainerRef = document.querySelector('.countries-cards-container');
const searchRef = document.querySelector('.js-input');

searchRef.addEventListener('input', 
    debounce(()=> { 

      if(searchRef) {
        clearClassList();
      }  

    const searchQuery = searchRef.value;

    countries.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(errorFetch)
}, 1000)
)

function renderCountryCard(country) {
  if(country.length > 10) {
    defaultModules.set(PNotifyMobile, {});
  alert({
    text: 'Too many matches!!!!!'
  });

  if (defaultModules.set(PNotifyMobile, {})) {
    return;
  }
}

if(country.length === 1) {
    const allMarkup = countryCardTpl(...country);
    cardContainerRef.innerHTML = allMarkup;
} else {
    const markup = countriesListTpl(country);
    cardContainerRef.innerHTML = markup;
}
}

function errorFetch(error) {
    alert ('You enter an undefiend country')
}

function clearClassList() {
  searchRef.innerHTML = '';
}
