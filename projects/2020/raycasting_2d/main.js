// Thanks to Coding Train: https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// Also useful: https://ncase.me/sight-and-light/
// Also useful: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

let walls = [];
let cornerPoints = [];
let particle;

let constructionMode;
let addedPoint;
let activePoint;

let primaryColor;
let laserColor;
let activeColor;

function setup() {
    createCanvas(windowWidth, windowHeight);

    activeColor = color(100, 255, 100);
    constructionMode = false;

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
    if (constructionMode) {
        background(255);
        primaryColor = color(0, 0, 0);
        laserColor   = color(255, 100, 100, 40);

        if (addedPoint) drawAddedPoint();
        if (activePoint) drawActivePoint();

    } else {
        background(0);
        primaryColor = color(255);
        laserColor   = color(100, 100, 255, 100);
    }

    noStroke();
    textSize(10);
    fill(primaryColor);
    text('Press any key to get into "Construction Mode". There you can build walls by left-clicking. By clicking on a point it is activated - push Backspace to delete the active Point.', 50, 50, 200, 70);

    for (let wall of walls) {
        wall.draw();
    }
    particle.draw()
    particle.look(walls);
}

function keyPressed() {
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

    return false;
}

function mousePressed() {
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
