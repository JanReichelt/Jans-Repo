// Nützliche Links:
// mouseenter:      https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
// svg map:         https://mapsvg.com/maps/world
// svg city icons:  http://tutorials.jenkov.com/svg/use-element.html
// Tooltips:        https://www.youtube.com/watch?v=SUWIMaWHpbk&t=937s
// Blue Empire:     https://blue-empire.diskoboss.de/

// ein riesen Umweg diese Daten auf einer eigenen Route abzulegen und abzufragen?
// Gibt es eine eleganteren Weg diese Daten in die ui.js hereinzuholen? (per handlebars/express API)
fetch('http://localhost:5000/countries')
    .then((res) => {
        if (res.ok) {
            console.log("Fetch ok");
            return res.json()
        }
        else console.log("FETCH ERROR");
    })
    .then((data) => {
        let countries = {};
        data.forEach(c => countries[c.short_code] = c);

        // select elements
        const country_paths = Array.from(document.querySelectorAll('#map path'));
        const tooltipDiv = document.getElementById('tooltip');
        const infosDiv = document.getElementById('infos');
        const info_text = document.getElementById('info_text');

        // add event listeners
        country_paths.forEach(function(c) {
           c.addEventListener("mouseover",  enter);
           c.addEventListener("mouseleave", leave);
           c.addEventListener("click", click);
        });


        // event listener functions
        function enter(e){
            // Für ein skalieren der Pfade on mouseenter muss ich erst dynamisch die bounding box des Pfades berechnen
            //, damit ich abhängig davon die richtigen transform-origin(50% 50%)-Werte finden kann. Die 50% 50% werden sonst
            // auf die gesamte svg bezogen
            e.srcElement.style.fill = 'gold';
            // e.srcElement.style.zIndex = 1000;
            displayTooltip(e, this);
            e.srcElement.classList.add('hover');
        }

        function leave(e) {
            e.srcElement.style.fill = '#059E4D';
            tooltipDiv.style.opacity = 0;
            infosDiv.innerHTML = "";
            infosDiv.style.opacity = 0.2;
            infosDiv.style.height = "0px";
            e.srcElement.classList.remove('hover');
        }

        function click(e) {
            let name = e.srcElement.id;
            show_country_data(name);
        }

        function displayTooltip(e, country) {
            let short = e.target.getAttribute('id');
            tooltipDiv.innerHTML =  `${e.target.getAttribute('title')} (${e.target.id})`;
            tooltipDiv.innerHTML =  `${countries[short].translations} (${e.target.id})`;
            tooltipDiv.style.top =  `${e.pageY}px`;
            tooltipDiv.style.left = `${e.pageX}px`;
            tooltipDiv.style.opacity = 1;
        }

        function show_country_data(name) {
            if (name in countries) {
                let img_flag = countries[name].flag_url;
                infosDiv.style.opacity = 1;
                infosDiv.style.height = "180px";
                infosDiv.innerHTML = `
                    <span id=\"info_text\">
                    Name: ${countries[name].name}<br>
                    Hauptstadt: ${countries[name].capital}<br>
                    Einwohner: ${countries[name].population}<br>
                    Fläche: ${countries[name].area}<br>
                    <br>
                    <img
                        src=\"${img_flag}\"
                        alt=\"flag ${countries[name].name}\"
                        height=\"50\">
                    </span>`;
                info_text.style.opacity = 1;
            } else {
                console.log('Es liegen keine Daten dazu vor. \nBitte Kürzel (2 Buchstaben) eingeben.');
            }
        }
    });
