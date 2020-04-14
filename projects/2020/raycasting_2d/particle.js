class Particle {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.dir = createVector(1, 0);
        this.rays = [];

        for (let a = 0; a < 90; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    draw() {
        // Laser-Quellpunkt zeichnen
        fill('red');
        noStroke();
        ellipse(this.pos.x, this.pos.y, 10);
        // Update Position
        this.update(mouseX, mouseY);
    }

    look(walls) {
        this.rays.forEach((ray) => {
            ray.closest = null;
            let record = Infinity;
            walls.forEach((wall) => {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        ray.closest = pt;
                    }
                }
            });
            ray.draw();
        });
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    turn(direction) {
        this.rays.forEach(ray => {
            if (direction === 'left') {
                ray.setDir(-0.1);
            } else if (direction === 'right') {
                ray.setDir(0.1);
            }
        });
    }

    changeFieldOfView(direction) {
        if (direction === 'up') {
            const angle = degrees(this.rays[0].dir.angleBetween(createVector(1,0)));
            if (this.rays.length < 360) {
                this.rays.push(new Ray(this.pos, radians(this.rays.length-angle)));
            }
        } else if (direction === 'down') {
            if (this.rays.length > 1) {
                this.rays.pop();
            }
        }
    }
}
