class Ray {
    constructor(pos, angle, deg, origin) {
        this.primColor = color(100, 100, 255, 180);
        this.secColor = color(255, 100, 100, 60);
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
        this.angle = degrees(angle);
        this.deg = deg || 0;
        this.origin = origin || null;
        this.reflection;
        this.closest;
        this.closestWall;
    }

    draw() {
        let col;
        if (constructionMode) col = this.secColor;
        else col = this.primColor;

        // dimmen reflektierter Strahlen
        // if (this.deg > 0) {
        //     col.setAlpha(col.levels[3]/this.deg+1);
        // }

        if (this.closest) {
            stroke(col);
            fill(col);
            line(this.pos.x, this.pos.y, this.closest.x, this.closest.y);
            ellipse(this.closest.x, this.closest.y, 6);
        }

        stroke(color(220,180,0,150));
        fill(color(220,180,0,150));
        line(this.pos.x, this.pos.y, this.pos.x+5000*this.dir.x, this.pos.y+5000*this.dir.y);

    }

    update(x, y) {
        if (this.deg === 0) this.pos.set(x, y);
        else {
            let o = this.origin;

            this.pos = o.getClosest();
            let a = radians(o.getAngle(o.closestWall, o.closest)+o.closestWall.angle);
            this.dir = p5.Vector.fromAngle(a);
        }
    }

    getIntersection(wall) {
        let w = wall;
        let r = this;

        // Paralellität checken - dot-product der beiden Richtungsvektoren
        let dot = p5.Vector.dot(r.dir, w.dir);
        // Das ist dasselbe wie dot
        // let w_abs = Math.sqrt((w.dir.x*w.dir.x + w.dir.y*w.dir.y));
        // let r_abs = Math.sqrt((r.dir.x*r.dir.x + r.dir.y*r.dir.y));
        // let dot2 = w.dir.x*r.dir.x + w.dir.y*r.dir.y/(w_abs*r_abs);

        if (dot === 0) return null;

        let t2 = (r.dir.x*(w.start.y-r.pos.y)+r.dir.y*(r.pos.x-w.start.x)) / (w.dir.x*r.dir.y-w.dir.y*r.dir.x);
        let t1 = (w.start.x+t2*w.dir.x-r.pos.x)/r.dir.x;

        if (t1 < 0) return null;
        if (t2 < 0 || t2 > 1) return null;

        let pt = createVector();
        pt.x = r.pos.x + t1 * r.dir.x;
        pt.y = r.pos.y + t1 * r.dir.y;

        // console.log(`intersection point: x: ${pt.x}; y: ${pt.y}`);
        return pt
    }

    getClosest() {
        let record = Infinity;
        walls.forEach((wall) => {
            const pt = this.getIntersection(wall);
            if (pt) {
                const d = p5.Vector.dist(this.pos, pt);
                if (d < record) {
                    record = d;
                    this.closest = pt;
                    this.closestWall = wall;
                }
            }
        });
        console.log(`intersection point: x: ${this.closest.x}; y: ${this.closest.y}`);
        return this.closest;
    }

    addReflection(arr) {
        if (arr) {
            console.log("arr in addReflection", arr);
            let reflPos = this.getClosest();
            let reflAngle = radians(this.getAngle(this.closestWall, reflPos.pos)+this.closestWall.angle);
            let reflection = new Ray(reflPos, reflAngle, this.deg+1, this);
            this.reflection = reflection;

            arr.push(reflection);
            return reflection;
        } else {
            return;
        }
    }

    setDir(angle) {
        this.dir.rotate(angle);
        this.angle = degrees(this.dir.heading());
    }

    getAngle(wall, pt) {
        // https://p5js.org/reference/#/p5.Vector/angleBetween
        return wall.angle-this.angle;
    }
}
