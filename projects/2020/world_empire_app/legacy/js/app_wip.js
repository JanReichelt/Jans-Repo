// Nützliche Links:
// mouseenter:      https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
// svg map:         https://mapsvg.com/maps/world
// svg city icons:  http://tutorials.jenkov.com/svg/use-element.html
// Tooltips:        https://www.youtube.com/watch?v=SUWIMaWHpbk&t=937s
// Blue Empire:     https://blue-empire.diskoboss.de/

// select elements
// const map = document.getElementById('map');
const countries = Array.from(document.querySelectorAll('#map path'));
const tooltipDiv = document.getElementById('tooltip');
const infosDiv = document.getElementById('infos');
const info_text = document.getElementById('infos');
// const mouse = {x:0, y:0};

// add event listeners
// map.addEventListener('mousemove', getMousePos);
countries.forEach(function(c) {
   c.addEventListener("mouseover",  enter);
   c.addEventListener("mouseleave", leave);
   c.addEventListener("click", click);
});

// event listener functions
function enter(e){
    e.srcElement.style.fill = 'gold';
    displayTooltip(e, this);
    e.srcElement.classList.add('hover');
}

// function getMousePos(e) {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// }

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
    print_main_data(name);
}

function displayTooltip(e, country) {
    tooltipDiv.innerHTML =  `${e.target.getAttribute('title')} (${e.target.id})`;
    // tooltipDiv.style.top =  `${mouse.y}px`;
    // tooltipDiv.style.left = `${mouse.x}px`;
    tooltipDiv.style.top =  `${e.pageY}px`;
    tooltipDiv.style.left = `${e.pageX}px`;
    tooltipDiv.style.opacity = 1;
}

countries.forEach((c)=>{
    console.log(c.id);
});
console.log(countries.length);
