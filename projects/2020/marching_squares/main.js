//Coding Train: https://www.youtube.com/watch?v=0ZONMNUKTfU
// Laque Marching Cubes: https://www.youtube.com/watch?v=M3iI2l0ltbE

let w;              // square Size
let points;         // Array, p5-Vector of every grid point
let floorCOLOR;     // currently unused, color in area mode
let radio;          // input radio button
let button;         // input re-render button
let slider;         // input slider square size

function setup() {
    createCanvas(750, 500);

    //UI
    radio = createRadio();
    radio.option('line');
    radio.option('area');
    radio.selected('line');

    button = createButton('Re-render');
    button.position(19, 19);
    button.mousePressed(assignPoints);

    slider = createSlider(5, 100, 30);
    slider.changed(sliderUpdate);

    // square Size
    floorCOLOR = color(150, 120, 40, 5);
    w = slider.value();
    assignPoints();
}

function draw() {
    background('rgba(51,51,51, 0.2)');

    for (let i = 0; i < (width/w); i++) {
        for (let j = 0; j < (height/w); j++) {
            // pointVals represents all four random corner values from -1 to 1
            let pointVals = [];
            pointVals.push(points[i][j].z, points[i+1][j].z, points[i+1][j+1].z, points[i][j+1].z);

            if (radio.value() === 'line') {
                linie(points[i][j], pointVals);
            } else if (radio.value() === 'area') {
                fläche(points[i][j], pointVals);
            }
        }
    }
}

function assignPoints() {
    points = [];

    for (let i = 0; i < width/w+1; i++) {
        points.push([]);
        for (let j = 0; j < height/w+1; j++) {
            points[i].push(createVector(i*w, j*w, random(-1, 1)));
            // strokeWeight(2);
            // stroke(points[i][j].z*255);
            // point(points[i][j].x,points[i][j].y);
        }
    }
    // console.log(points);
}

function getSum(a, b, c, d) {
    a = (a < 0) ? 0 : 1;
    b = (b < 0) ? 0 : 1;
    c = (c < 0) ? 0 : 1;
    d = (d < 0) ? 0 : 1;
    return 8*a + 4*b + 2*c + d; // sum is represented as binary value of all four corners
}

function sliderUpdate() {
    w = slider.value();
    assignPoints();
}

function linie(point, pV) {
    let sqType = getSum(pV[0], pV[1], pV[2], pV[3]);
    stroke(255);
    strokeWeight(1);
    switch (sqType) {
        case 1:
        case 14:
            line(point.x, point.y+w*0.5, point.x+w*0.5, point.y+w);
            break;
        case 2:
        case 13:
            line(point.x+w*0.5, point.y+w, point.x+w, point.y+w*0.5);
            break;
        case 3:
        case 12:
            line(point.x, point.y+w*0.5, point.x+w, point.y+w*0.5);
            break;
        case 4:
        case 11:
            line(point.x+w*0.5, point.y, point.x+w, point.y+w*0.5);
            break;
        case 5:
            line(point.x, point.y+w*0.5, point.x+w*0.5, point.y);
            line(point.x+w*0.5, point.y+w, point.x+w, point.y+w*0.5);
            break;
        case 6:
        case 9:
            line(point.x+w*0.5, point.y, point.x+w*0.5, point.y+w);
            break;
        case 7:
        case 8:
            line(point.x, point.y+w*0.5, point.x+w*0.5, point.y);
            break;
        case 10:
            line(point.x, point.y+w*0.5, point.x+w*0.5, point.y+w);
            line(point.x+w*0.5, point.y, point.x+w, point.y+w*0.5);
            break;
    }

}

function fläche(point, pV) {
    let sqType = getSum(pV[0], pV[1], pV[2], pV[3]);

    noStroke();
    //fill(floorCOLOR);
    switch (sqType) {
        case 1:
            triangle(point.x, point.y+w*(1-pV[3]), point.x+w*pV[3], point.y+w, point.x, point.y+w);
            break;
        case 2:
            triangle(point.x+w*(1-pV[2]), point.y+w, point.x+w, point.y+w*(1-pV[2]), point.x+w, point.y+w);
            break;
        case 3:
            beginShape();
                vertex(point.x, point.y+w*(1-pV[3]));
                vertex(point.x+w, point.y+w*(1-pV[2]));
                vertex(point.x+w, point.y+w);
                vertex(point.x, point.y+w);
            endShape(CLOSE);
            break;
        case 4:
            triangle(point.x+w*0.5, point.y, point.x+w, point.y, point.x+w, point.y+w*0.5);
            break;
        case 5:
            beginShape();
                vertex(point.x, point.y+w*(1-pV[3]));
                vertex(point.x+w*(1-pV[1]), point.y);
                vertex(point.x+w, point.y);
                vertex(point.x+w, point.y+w*pV[1]);
                vertex(point.x+w*pV[3], point.y+w);
                vertex(point.x, point.y+w);
            endShape(CLOSE);
            break;
        case 6:
            beginShape();
                vertex(point.x+w*(1-pV[1]), point.y);
                vertex(point.x+w, point.y);
                vertex(point.x+w, point.y+w);
                vertex(point.x+w*(1-pV[2]), point.y+w);
            endShape(CLOSE);
            break;
        case 7:
            beginShape();
                vertex(point.x, point.y+w*(1-pV[3]));
                vertex(point.x+w*(1-pV[1]), point.y);
                vertex(point.x+w, point.y);
                vertex(point.x+w, point.y+w);
                vertex(point.x, point.y+w);
            endShape(CLOSE);
            break;
        case 8:
            triangle(point.x, point.y, point.x+w*pV[0], point.y, point.x, point.y+w*pV[0]);
            break;
        case 9:
            beginShape();
                vertex(point.x, point.y);
                vertex(point.x+w*pV[0], point.y);
                vertex(point.x+w*pV[3], point.y+w);
                vertex(point.x, point.y+w);
            endShape(CLOSE);
            break;
        case 10:
            beginShape();
                vertex(point.x, point.y);
                vertex(point.x+w*pV[0], point.y);
                vertex(point.x+w, point.y+w*(1-pV[2]));
                vertex(point.x+w, point.y+w);
                vertex(point.x+w*(1-pV[2]), point.y+w);
                vertex(point.x, point.y+w*pV[0]);
            endShape(CLOSE);
            break;
        case 11:
            beginShape();
                vertex(point.x, point.y);
                vertex(point.x+w*pV[0], point.y);
                vertex(point.x+w, point.y+w*(1-pV[2]));
                vertex(point.x+w, point.y+w);
                vertex(point.x, point.y+w);
            endShape(CLOSE);
            break;
        case 12:
            beginShape();
                vertex(point.x, point.y);
                vertex(point.x+w, point.y);
                vertex(point.x+w, point.y+w*pV[1]);
                vertex(point.x, point.y+w*pV[0]);
            endShape(CLOSE);
            break;
        case 13:
            beginShape();
                vertex(point.x, point.y);
                vertex(point.x+w, point.y);
                vertex(point.x+w, point.y+w*pV[1]);
                vertex(point.x+w*pV[3], point.y+w);
                vertex(point.x, point.y+w);
            endShape(CLOSE);
            break;
        case 14:
            beginShape();
                vertex(point.x, point.y);
                vertex(point.x+w, point.y);
                vertex(point.x+w, point.y+w);
                vertex(point.x+w*(1-pV[2]), point.y+w);
                vertex(point.x, point.y+w*pV[0]);
            endShape(CLOSE);
            break;
        case 15:
            rect(point.x, point.y, w, w);
            break;
    }
}
