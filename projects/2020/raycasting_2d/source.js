class Source {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.dir = createVector(1, 0);
        this.highestDeg = 3;    // Wie oft soll jeder Ray maximal reflektiert werden?
        this.rays = {}
        for (let i = 0; i < this.highestDeg; i++) {
            this.rays[i] = [];
        }

        for (let a = 0; a < 1; a += 1) { // original: 90deg
            // Primäre Strahlen hinzufügen
            let r = new Ray(this.pos, radians(a));
            this.rays[0].push(r);

            // Sekundäre Strahlen hinzufügen
            for (let i = 1; i < this.highestDeg; i++) {
                // r = r.addReflection(this.rays[i]);
            }
        }
    }

    draw() {
        // Laser-Quellpunkt zeichnen
        fill('red');
        noStroke();
        ellipse(this.pos.x, this.pos.y, 10);
        // Update Position
        this.update(mouseX, mouseY);

        // Das war ehemals die look()-Methode
        console.log("---DRAW---");
        for (let i = 0; i < this.highestDeg; i++) {
            if (this.rays[i].length > 0) {
                this.rays[i].forEach((ray) => {
                    // console.log("in draw", ray);
                    ray.getClosest();
                    ray.draw();
                });
            }
        }
    }

    update(x, y) {
        this.pos.set(x, y);
        for (let i = 0; i < this.highestDeg; i++) {
            this.rays[i].forEach(ray => ray.update(x, y));
        }
    }

    turn(direction) {
        this.rays[0].forEach(ray => {
            if (direction === 'left') {
                ray.setDir(-0.1);
            } else if (direction === 'right') {
                ray.setDir(0.1);
            }
        });
    }

    changeFieldOfView(direction) {
        if (direction === 'up') {
            const angle = degrees(this.rays[0][0].dir.angleBetween(createVector(1,0)));
            if (this.rays[0].length < 360) {
                let r = new Ray(this.pos, radians(this.rays[0].length-angle));
                this.rays[0].push(r);
                r.addReflection(this.rays[r.deg+1]);
            }
        } else if (direction === 'down') {
            if (this.rays[0].length > 1) {
                for (let i = 0; i < this.highestDeg; i++) {
                    this.rays[i].pop();
                }
            }
        }
    }
}
