class Particle {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        for (let a = 0; a < 360; a += 1) {
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
}
