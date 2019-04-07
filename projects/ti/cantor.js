//https://fernuni.digreb.net/?p=580
//http://drops.dagstuhl.de/opus/volltexte/2012/3632/pdf/30.pdf

const input = document.getElementById('input');
const output = document.getElementById('output');
const inputK = document.getElementById('inputK');

let outputValue = {};

function tupel() {
    outputValue = {};
    let k = Number(inputK.value)-1;
    let inputValue = Number(input.value);
    let result = 0;
    let tupel = [];

    cantor(inputValue);
    tupel.push(outputValue.x);
    k--;

    for(k; k >= 0; k--) {
        if(k === 0) {
            tupel.push(outputValue.y);
        } else if (k > 0) {
            result = cantor(outputValue.y);
            tupel.push(outputValue.x);
        }
        console.log(outputValue);
    }

    output.innerHTML = `[${tupel}]`;
}

function cantor(val) {
    let result = 0;

    for(let x = 0; x <1000000; x++) {
        for(let y = 0; y < 1000000; y++) {
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
    outputValue.value = ((x+y+1)*(x+y)/2)+x;

    return outputValue.value;
}

function fromTupel() {
    let inputTupel = document.getElementById('inputTupel').value;
    let tupel = inputTupel.split(',');
    let result = 0;

    let x = Number(tupel.pop());
    let y = Number(tupel.pop());
    result = cantorValue(x, y);
    outputValue[`n${tupel.length}`] = result;

    if (tupel.length > 0) {
        for (let i = 0; i < tupel.length; i++) {
            cantorValue(Number(tupel[tupel.length-i-1]), result);
            outputValue[`n${i}`] = outputValue.value;
        }
    }
    console.log(outputValue);
    output.innerHTML = outputValue.value;
}
