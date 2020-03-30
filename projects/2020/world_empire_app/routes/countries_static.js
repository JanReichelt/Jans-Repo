const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Country = require('../models/Country');

// Get Country List
router.get('/', (req, res) => Country.findAll()
    .then(countries => {
        console.log(countries);
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

Add a country
router.get('/add', (req, res) => {
    db.Country.destroy({
      where: {},
      // truncate: true
    })

    const data = {
        id: 1,
        name: 'Germany',
        short_code: 'DE',
        capital: 'Berlin',
        subregion: 'Middle Europe',
        population: 81000000,
        area: 360000,
        borders: 'FR,BE,SW,IT,HO,TS,DN',
        native_name: 'Deutschland',
        currencies: 'EUR',
        languages: 'german,english',
        translations: 'Deutschland',
        flag_url: 'flag@domain.de',
        fraction: 'neutral',
        startland: false,
        sympathy: 0,
        neighbors: 'FR,BE,SW,IT,HO,TS,DN',
        has_factory: false,
        has_casern: false,
        troops_in_training: 'none',
        troops: 'none',
        has_research_center: false,
        research_perks: 'none',
        money_current: 300000,
        money_income: 12500,
        money_expense: 0
    }

    let {id, name, short_code, capital, subregion, population, area, borders, native_name,
    currencies, languages, translations, flag_url, fraction, startland, sympathy,
    neighbors, has_factory, has_casern, troops_in_training, troops, has_research_center,
    research_perks, money_current, money_income, money_expense} = data;

// Insert into Table
Country.create({
    id,
    name,
    short_code,
    capital,
    subregion,
    population,
    area,
    borders,
    native_name,
    currencies,
    languages,
    translations,
    flag_url,
    fraction,
    startland,
    sympathy,
    neighbors,
    has_factory,
    has_casern,
    troops_in_training,
    troops,
    has_research_center,
    research_perks,
    money_current,
    money_income,
    money_expense
})
    .then(country => res.redirect('/countries'))
    .catch(err => console.log(err));
});
module.exports = router;
