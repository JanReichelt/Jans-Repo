// Thanks to Coding Train: https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// Also useful: https://ncase.me/sight-and-light/
// Also useful: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

/*
TODO:
- Winkelberechnung zwischen ray und wall einfügen: https://www.youtube.com/watch?v=qaoRO95hH4c
- cos alpha = a*b (Skalarprodukt)/ |a| * |b|
- Sobald Winkelberechnet wurde für spiegelnde Oberflächen Ausfallwinkel berechnen (180-alpha)
- Absorptionsgrad für Wände einfügen (vll. kann das sogar generelle Eigenschaft der Wand sein - entgegengesetzt zu Spiegelgrad, sodass nicht mehr unbedingt verschiedene Wandtypen entwickelt werden müssen, sondern nur noch unterschiedliche Ausprägungen von Spiegeln/Absorption nötig sind)
- Rendering: gespiegelte Rays bekommen keinen Endpunkt, sondern erst, wenn sie auf eine Wand treffen, die den Großteil des Rays absorbiert
- Rendering 2: Absorption nutzen, um zu Ermessen, wie viel alpha der reflektierte Strahl hat (und, ob noch eine Reflektion nötig ist - Grenzwert)
*/

let walls = [];
let cornerPoints = [];
let particle;

let update;
let constructionMode;
let addedPoint;
let activePoint;

let primaryColor;
let backgroundColor;
let laserColor;
let activeColor;

function setup() {
    createCanvas(windowWidth, windowHeight);

    activeColor = color(100, 255, 100);
    backgroundColor = color (0, 0, 0);
    constructionMode = false;
    update = true;

    particle = new Particle();
    for (let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Wall(x1, y1, x2, y2);
    }
    walls.push(new Wall(0, 0, width, 0));
    walls.push(new Wall(width, 0, width, height));
    walls.push(new Wall(width, height, 0, height));
    walls.push(new Wall(0, height, 0, 0));
}


function draw() {


    if (keyIsPressed) controls('keyDown');

    if (update) {
        update = !update;
        background(backgroundColor);

        if (constructionMode) {
            backgroundColor = color(255, 255, 255);
            primaryColor = color(0, 0, 0);
            laserColor   = color(255, 100, 100, 40);

            if (addedPoint) drawAddedPoint();
            if (activePoint) drawActivePoint();

            noStroke();
            textSize(10);
            fill(primaryColor);
            text('LEFT-CLICK: Add or activate Point.\n2nd LEFT-CLICK: Add wall. \nBACKSPACE: delete wall with activated point.', 50, 50, 200, 70);
        } else {
            backgroundColor = color(0, 0 ,0);
            primaryColor = color(255, 255, 255);
            laserColor   = color(100, 100, 255, 100);

            noStroke();
            textSize(10);
            fill(primaryColor);
            text('ANY KEY:  get into "Construction Mode". \nUP/DOWN-Arrow:  change your field of view. \nLEFT/RIGHT-Arrow:  rotate your view.', 50, 50, 250, 70);
        }

        for (let wall of walls) {
            wall.draw();
        }
        particle.look(walls);
        particle.draw()
    }
}

function drawAddedPoint() {
    fill(primaryColor);
    ellipse(addedPoint.x, addedPoint.y, 10);
}

function drawActivePoint() {
    fill(activeColor);
    stroke(primaryColor);
    strokeWeight(1);
    ellipse(activePoint.x, activePoint.y, 15);
}

function getCornerPoints() {
    cornerPoints.splice(0, cornerPoints.length); // es ginge vermutlich auch points=[]

    walls.forEach((wall) => {
        cornerPoints.push(wall.start, wall.end);
    });
}

function deletePoint() {
    if (activePoint) {
        let index;
        for (let i = 0; i < walls.length; i++) {
            let w = walls[i];
            if (w.start.x === activePoint.x || w.end.x === activePoint.x &&
                w.start.y === activePoint.y || w.end.y === activePoint.y) {
                index = i;
            }
        }
        walls.splice(index, 1);
    }
}


function controls(mode) {
    if (mode === 'keyPress') {
        if (keyCode !== LEFT_ARROW &&
            keyCode !== RIGHT_ARROW &&
            keyCode !== UP_ARROW &&
            keyCode !== DOWN_ARROW) {
            getCornerPoints();

            if (constructionMode && activePoint) {
                if (keyPressed && keyCode === BACKSPACE) {
                    deletePoint();
                    addedPoint = null;
                    activePoint = null;
                } else {
                    constructionMode = !constructionMode;
                }
            } else {
                constructionMode = !constructionMode;
            }
        }
        return false;
    } else if (mode === 'mousePress') {
        if (constructionMode) {
            let pt = createVector(mouseX, mouseY);

            if (!addedPoint) {
                // Steuerung aktiver Punkt
                let found = false;
                cornerPoints.forEach((p) => {
                    if (p.dist(pt) <= 10) {
                        found = true;
                        activePoint = p;
                        pt = p;
                    }
                });
                if (!found) activePoint = null;

                addedPoint = pt;
                cornerPoints.push(pt);
            } else {
                cornerPoints.forEach((p) => {
                    if (p.dist(pt) <= 10) pt = p;
                });

                walls.push(new Wall(addedPoint.x, addedPoint.y, pt.x, pt.y));
                cornerPoints.push(pt);

                addedPoint = null;
                activePoint = false;
            }
        }
    } else if (mode === 'mouseClick') {
    } else if (mode === 'keyDown') {
        if (keyCode === LEFT_ARROW) particle.turn('left');
        else if (keyCode === RIGHT_ARROW) particle.turn('right');
        if (keyCode === UP_ARROW) particle.changeFieldOfView('up');
        else if (keyCode === DOWN_ARROW) particle.changeFieldOfView('down');
    }
    update = true;
}

// Event Listeners
function keyPressed()   {controls('keyPress')};
function mousePressed() {controls('mousePress')};
function mouseClicked() {controls('mouseClick')};
function mouseMoved()   {controls('mouseMove')}
