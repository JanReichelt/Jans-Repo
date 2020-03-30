const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Country = require('../models/Country');
const fetch = require('node-fetch');

// JSON-data - darauf greift aktuell noch ui.js zu, um die Länderdaten zu bekommen.
router.get('/', (req, res) =>
    Country.findAll()
        .then(countries => {
            console.log(countries);
            // res.sendStatus(200);
            res.send(countries); //send the complete json in plain view
        })
        .catch(err => console.log(err))
);

// DATEN AUFBEREITEN
const url_restcountries = 'https://restcountries.eu/rest/v2/all';
let cj = {}; // für "Countries_JSON"

fetch(url_restcountries, {mode: 'cors'}) //for cors: https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
    .then((resp) => {
        if (resp.body) {
            return resp.json();
        } else {
            console.log("no body");
        }
    })
    .then((data) => {
        // JSON anlegen (cj)
        data.forEach((c) => {
            let str_name = c.alpha2Code;
            cj[str_name] = {};
            cj[str_name].data = c;
            cj[str_name].stat = {
                fraktion: 'neutral',
                startland: false,
                sympathie: 0,
                nachbarn: [],
                fabrik: {
                    hat_fabrik: false,
                    produktivität: 0,
                },
                kaserne: {
                    hat_kaserne: false,
                    einheiten_in_ausb: {},
                },
                einheiten: {
                    infanterie: 0,
                    kavallerie: 0,
                    artillerie: 0
                },
                forschung: {
                    hat_forschungseinrichtung: false,
                    perks: {},
                },
                geld: {
                    aktuell: 0,
                    ausgabe: 0,
                    einnahme: 0
                }
            }
        });
        // console.log(cj);

        json_list = [];
        for (var country in cj) {
            json_list.push(country);
        }

        // console.log(cj);
        let index = 0;

        router.get('/add', (req, res) => {
            for(var c in cj) {
                let arr = [];

                let currencies_str = '';
                for (let [key, value] of Object.entries(cj[c].data.currencies)) {
                   arr.push(`${value.code}_${value.name}_${value.symbol}`);
                }
                currencies_str = arr.join();

                let borders_str = cj[c].data.borders.join();

                let languages_str = '';
                arr = [];
                for (let [key, value] of Object.entries(cj[c].data.languages)) {
                    arr.push(`${value.iso639_1}_${value.iso639_2}_${value.name}_${value.nativeName}`);
                }
                languages_str = arr.join();

                // let translations_str = '';
                // arr = [];
                // for (let [key, value] of Object.entries(cj[c].data.translations)) {
                //     arr.push(`${key}_${value}`);
                // }
                // translations_str = arr.join();
                // console.log(cj[c].data.translations.de);

                let neighbors_str = cj[c].stat.nachbarn.join();

                let tit_str = '';
                arr = [];
                if (Object.entries(cj[c].stat.kaserne.einheiten_in_ausb).length > 0 ) {
                    for (let [key, value] of Object.entries(cj[c].stat.kaserne.einheiten_in_ausb)) {
                        arr.push(`${key}_${value}`);
                    }
                }
                tit_str = arr.join();

                let troops_str = '';
                arr = [];
                if (Object.entries(cj[c].stat.einheiten).length > 0 ) {
                    for (let [key, value] of Object.entries(cj[c].stat.einheiten)) {
                        arr.push(`${key}_${value}`);
                    }
                }
                troops_str = arr.join();

                let perks_str = '';
                arr = [];
                if (Object.entries(cj[c].stat.forschung.perks).length > 0 ) {
                    for (let [key, value] of Object.entries(cj[c].stat.forschung.perks)) {
                        arr.push(`${key}_${value}`);
                    }
                }
                perks_str = arr.join();
                // console.log(c.data);
                // Add a country
                    /* How to parse different datatypes to String */
                    // -- empty Object
                        // console.log(cj[c].stat.forschung.troops ? cj[c].stat.forschung.troops : '');
                    // -- Array
                        // console.log(cj[c].stat.nachbarn.join());
                    // -- Object
                        // let arr = [];
                        // for (let [key, value] of Object.entries(cj[c].data.translations)) {
                        //   arr.push(`${key}_${value}`);
                        // }
                        // let arr_str = arr.join();
                        // console.log(arr_str);

                const data = {
                    id: index,
                    name: cj[c].data.name,
                    short_code: cj[c].data.alpha2Code,
                    capital: cj[c].data.capital,
                    subregion: cj[c].data.subregion,
                    population: cj[c].data.population,
                    area: cj[c].data.area,
                    borders: borders_str,
                    native_name: cj[c].data.nativeName,
                    currencies: currencies_str,
                    languages: languages_str,
                    translations: cj[c].data.translations.de,
                    flag_url: cj[c].data.flag,
                    fraction: cj[c].stat.fraktion,
                    startland: cj[c].stat.startland,
                    sympathy: cj[c].stat.sympathie,
                    neighbors: neighbors_str,
                    has_factory: cj[c].stat.fabrik.hat_fabrik,
                    has_casern: cj[c].stat.kaserne.hat_kaserne,
                    troops_in_training: tit_str,
                    troops: troops_str,
                    has_research_center: cj[c].stat.forschung.hat_forschungseinrichtung,
                    research_perks: perks_str,
                    money_current: cj[c].stat.geld.aktuell,
                    money_income: cj[c].stat.geld.einnahme,
                    money_expense: cj[c].stat.geld.ausgabe
                }

                let { id, name, short_code, capital, subregion, population, area, borders, native_name,
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
                    .then(country => console.log(country.dataValues))
                    .catch(err => console.log(err));
                index++;
            }
        });
    })
    .catch(function(error) {
        console.log('Looks like there was a fetch problem: \n', error);
    });

module.exports = router;
