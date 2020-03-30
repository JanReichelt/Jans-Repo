// const fs = require('fs');
// const person = require('./person');
// console.log(person);

let url_restcountries = 'https://restcountries.eu/rest/v2/all';
let countries_json = {};

fetch(url_restcountries, {mode: 'cors'}) //for cors: https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
    .then((resp) => {
        // console.log(resp);
        if (resp.body) {
            // console.log("there is a body");
            return resp.json();
        } else {
            // console.log("no body");
        }
    })
    .then((data) => {
        data.forEach((c) => {
            let str_name = c.alpha2Code;
            countries_json[str_name] = {};
            countries_json[str_name].data = c;
            countries_json[str_name].stat = {
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
        console.log(countries_json);
        let json_str = JSON.stringify(countries_json);
        open();
    })
    .catch(function(error) {
        console.log('Looks like there was a fetch problem: \n', error);
    });


function print_main_data(name) {
    if (name in countries_json) {
        // console.log(countries_json[name].data.capital);
        // console.log(countries_json[name].data.name);
        // console.log(`Einwohner: ${countries_json[name].data.population}`);
        // console.log(`Fläche: ${countries_json[name].data.area}`);
        //
        // alert(`
        //     Name: ${countries_json[name].data.name}
        //     Hauptstadt: ${countries_json[name].data.capital}
        //     Einwohner: ${countries_json[name].data.population}
        //     Fläche: ${countries_json[name].data.area}`);

        let img_flag = countries_json[name].data.flag;
        infosDiv.style.opacity = 1;
        infosDiv.style.height = "180px";
        infosDiv.innerHTML = `
            <span id=\"info_text\">
            Name: ${countries_json[name].data.name}<br>
            Hauptstadt: ${countries_json[name].data.capital}<br>
            Einwohner: ${countries_json[name].data.population}<br>
            Fläche: ${countries_json[name].data.area}<br>
            <br>
            <img
                src=\"${img_flag}\"
                alt=\"flag ${countries_json[name].data.name}\"
                height=\"50\">
            </span>`;
        info_text.style.opacity = 1;

    } else {
        console.log('Es liegen keine Daten dazu vor. \nBitte Kürzel (2 Buchstaben) eingeben.');
    }
}
console.log(countries_json.length);
var count = 0;
for (var k in countries_json) {
    if (countries_json.hasOwnProperty(k)) {
        console.log();
       ++count;
    }
}
console.log(count);
