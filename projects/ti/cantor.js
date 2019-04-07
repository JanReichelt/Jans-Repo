//https://fernuni.digreb.net/?p=580
//http://drops.dagstuhl.de/opus/volltexte/2012/3632/pdf/30.pdf

const input = document.getElementById('input');
const output = document.getElementById('output');
const inputK = document.getElementById('inputK');

let outputValue = {};

function index2tupel() {
    let tupel = [];
    let k = (Number(inputK.value) <= 1) ? 1 : Number(inputK.value)-1; // k represents tupel length
    let inputValue = Number(input.value);
    let result = 0;
    outputValue = {};

    cantor(inputValue);
    tupel.unshift(outputValue.y);
    k--;

    for(k; k >= 0; k--) {
        if(k === 0) {
            tupel.unshift(outputValue.x);
        } else if (k > 0) {
            result = cantor(outputValue.x);
            tupel.unshift(outputValue.y);
        }
        console.log(outputValue);
    }
    output.innerHTML = `[${tupel}]`;
}


function tupel2index() {
    let inputTupel = document.getElementById('inputTupel').value;
    let tupel = inputTupel.split(',');
    let result = 0;
    outputValue = {};

    let x = Number(tupel.shift());
    let y = Number(tupel.shift());
    result = cantorValue(x, y);

    while (tupel.length > 0) {
        result = cantorValue(result, Number(tupel.shift()));
    }

    console.log(outputValue);
    output.innerHTML = outputValue.value;
}


function cantor(val) {
    let result = 0;
    let counter = Math.floor(Math.sqrt(val)*2);

    for(let x = 0; x < counter; x++) {
        for(let y = 0; y < counter; y++) {
            result = cantorValue(x, y);
            if (result == val) {
                outputValue.x = x;
                outputValue.y = y;
                return outputValue;
            }
        }
    }
}


function cantorValue(x, y) {
    outputValue.x = x;
    outputValue.y = y;
    outputValue.value = ((x+y+1)*(x+y)/2)+y;

    return outputValue.value;
}
