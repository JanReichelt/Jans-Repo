// Thanks to Coding Train: https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// Also useful: https://ncase.me/sight-and-light/
// Also useful: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

/*
TODO:
- Sobald Winkelberechnet wurde für spiegelnde Oberflächen Ausfallwinkel berechnen (180-alpha)
- Absorptionsgrad für Wände einfügen (vll. kann das sogar generelle Eigenschaft der Wand sein - entgegengesetzt zu Spiegelgrad, sodass nicht mehr unbedingt verschiedene Wandtypen entwickelt werden müssen, sondern nur noch unterschiedliche Ausprägungen von Spiegeln/Absorption nötig sind)
- Rendering: gespiegelte Rays bekommen keinen Endpunkt, sondern erst, wenn sie auf eine Wand treffen, die den Großteil des Rays absorbiert
- Rendering 2: Absorption nutzen, um zu Ermessen, wie viel alpha der reflektierte Strahl hat (und, ob noch eine Reflektion nötig ist - Grenzwert)

Warum die reflektierten Strahlen nicht immer angezeigt werden, bzw. an Flächen hinter der eigentlichen Wand reflektieren:
- Das Problem ist, dass zu viele Funktionsaufrufe in ray.cast(wall) ohne eigentlichen Punkt returnieren,
  die Folge ist, dass kein Punkt gegeben ist, von dem der Ray ausgehen kann. Da das tempRays-Array
  regelmäßig geleert werden muss, ergeben sich daraus blinkende sekundäre Strahlen
- Je nahdem, wie viele Strahlen reflektiert werden sollen, ergibt sich schnell eine Zahl von über
  tausenden ohne Punkt returnierten ray.cast(wall)-Aufrufen. Unter welchen Bedingungen scheitert die Formel
  und wie kann ich das verbessern? Wenn verlässliche Ergebnisse da sind, kann ich auch verlässlich
  Strahlen reflektieren.
*/


/*
    Aktuelle Fragen:
    - Warum habe ich als closest point direkt nach Programmstart x: NaN; y: NaN?
    - Warum habe ich immer einen Strahl weniger in den Reflektionen als in den unabhängigen Strahlen?
    - Warum kann ich alle Reflektionen ohne Probleme zeichnen, wenn ich eine beliebige Länge angebe, aber nur einen Bruchteil davon, wenn ich dort auch den nächsten Schnittpunkt berechnen möchte?

*/
let walls = [];
let cornerPoints = [];
let source;

let update;
let constructionMode;
let addedPoint;
let activePoint;

let primaryColor;
let backgroundColor;
let activeColor;

function setup() {
    createCanvas(windowWidth-20, windowHeight-20);

    activeColor = color(100, 255, 100);
    backgroundColor = color (0, 0, 0);
    constructionMode = false;
    update = true;

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
    source = new Source();
}


function draw() {
    if (keyIsPressed) controls('keyDown');

    // Nur Szene neu berechnen, wenn Bool update == true (Ressourcen sparen)
    if (update) {
        update = !update;
        background(backgroundColor);

        // constuction Mode und Hilfstexte
        if (constructionMode) {
            backgroundColor = color(255, 255, 255);
            primaryColor = color(0, 0, 0);

            if (addedPoint) drawAddedPoint();
            if (activePoint) drawActivePoint();

            noStroke();
            textSize(10);
            fill(primaryColor);
            text('LEFT-CLICK: Add or activate Point.\n2nd LEFT-CLICK: Add wall.\nBACKSPACE: delete wall with activated point.', 50, 50, 200, 70);
        } else {
            backgroundColor = color(0, 0 ,0);
            primaryColor = color(255, 255, 255);

            noStroke();
            textSize(10);
            fill(primaryColor);
            text('ANY KEY:  get into "Construction Mode".\nUP/DOWN-Arrow:  change your field of view.\nLEFT/RIGHT-Arrow:  rotate your view.', 50, 50, 250, 70);
        }

        // Walls und Rays
        walls.forEach(wall => wall.draw());
        source.draw()
    }
}

// Darstellung Hilfspunkte im constructionMode
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

// Suche aller Wall-Eckpunkte
function getCornerPoints() {
    cornerPoints.splice(0, cornerPoints.length); // es ginge vermutlich auch points=[]

    walls.forEach((wall) => {
        cornerPoints.push(wall.start, wall.end);
    });
}

// Löschen der Wall mit aktiviertem Punkt
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

// EventHandler
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
                if (keyCode === 68) {
                    console.log("Ausgabe reflektierte Strahlen");
                    let arr = [];
                    source.rays[1].forEach(ray => {
                        let r = new Ray(ray.pos, ray.angle, ray.deg, ray.origin);
                        arr.push(r);
                    });
                    console.log(arr);
                } else {
                    constructionMode = !constructionMode;
                }
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
        if      (keyCode === LEFT_ARROW)  source.turn('left');
        else if (keyCode === RIGHT_ARROW) source.turn('right');
        if      (keyCode === UP_ARROW)    source.changeFieldOfView('up');
        else if (keyCode === DOWN_ARROW)  source.changeFieldOfView('down');
    }
    update = true;
}

// Event Listeners
function keyPressed()   {controls('keyPress')};
function mousePressed() {controls('mousePress')};
function mouseClicked() {controls('mouseClick')};
function mouseMoved()   {controls('mouseMove')}
