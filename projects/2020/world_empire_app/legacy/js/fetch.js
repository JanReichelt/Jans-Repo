// const fs = require('fs');

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
        // JSON anlegen (countries_json)
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

        json_list = [];
        for (var country in countries_json) {
            json_list.push(country);
        }

        // Zum finden von svg-Pfaden, die nicht in countries_json enthalten sind - Pfade aus svg entfernt --> Ergebnis leere Liste
        // find_missing_elements(countries, json_list);
    })
    .catch(function(error) {
        console.log('Looks like there was a fetch problem: \n', error);
    });


function print_main_data(name) {
    if (name in countries_json) {
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

function find_missing_elements(bigger_list, smaller_list) {

    let filtered = bigger_list.filter((value, index, arr)=>{
        for(var c of smaller_list) {
            if (c == value.id) {
                return true;
            }
        }
    });

    for(var f of filtered) {
        for (let i = 0; i < bigger_list.length; i++) {
            if (bigger_list[i] == f) {
                bigger_list.splice(i, 1);
                i--;
            }
        }
    };
    console.log(bigger_list);
}
