class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (point.x >= this.x           &&
                point.x <  this.x + this.w  &&
                point.y >= this.y           &&
                point.y <  this.y + this.h);
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    contains(point) {
        return (Math.pow((point.x-this.x), 2) + Math.pow((point.y-this.y), 2)) < Math.pow(this.r/2, 2)
    }
}

class QuadTree {
    constructor(x,y,w,h,n) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    insert(point) {
        if (!this.contains(point)) return;

        if (this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            this.topRight.insert(point);
            this.topLeft.insert(point);
            this.bottomRight.insert(point);
            this.bottomLeft.insert(point);
        }
    }

    contains(point) {
        return (point.x >= this.x           &&
                point.x <  this.x + this.w  &&
                point.y >= this.y           &&
                point.y <  this.y + this.h);
    }

    subdivide() {
        this.topRight    = new QuadTree(this.x+this.w/2, this.y,          this.w/2, this.h/2, this.capacity);
        this.topLeft     = new QuadTree(this.x,          this.y,          this.w/2, this.h/2, this.capacity);
        this.bottomRight = new QuadTree(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/2, this.capacity);
        this.bottomLeft  = new QuadTree(this.x,          this.y+this.h/2, this.w/2, this.h/2, this.capacity);
        this.divided = true;
    }

    query(range, found) {
        if (!found) {
            found = [];
        }

        if (!this.intersects(range)) {
            return;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }

            if (this.divided) {
                this.topRight.query(range, found);
                this.topLeft.query(range, found);
                this.bottomRight.query(range, found);
                this.bottomLeft.query(range, found);
            }
        }
        return found;
    }

    intersects(range) {
        if (range instanceof Circle) {
            let testX = range.x;
            let testY = range.y;

            if (range.x < this.x)             testX = this.x;        // left edge
            else if (range.x > this.x+this.w) testX = this.x+this.w; // right edge

            if (range.y < this.y)             testY = this.y;        // top edge
            else if (range.y > this.y+this.h) testY = this.y+this.h; // bottom edge

            let distX = range.x-testX;
            let distY = range.y-testY;
            let distance = Math.sqrt((distX*distX) + (distY*distY));

            if (distance <= range.r) {
                return true;
            } else {
                return false;
            }
        } else if (range instanceof Rectangle) {
            return !(range.x > this.x+this.w ||
                     range.x+range.w < this.x &&
                     range.y > this.y+this.h ||
                     range.y+range.h < this.y);
        }
    }

    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rect(this.x,this.y, this.w, this.h);
        this.points.forEach(p => {
            strokeWeight(3);
            point(p.x,p.y);
        });
        if (this.divided) {
            this.topRight.show();
            this.topLeft.show();
            this.bottomRight.show();
            this.bottomLeft.show();
        }
    }
}
