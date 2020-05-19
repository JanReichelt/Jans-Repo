class Wall {
    constructor(x1, y1, x2, y2) {
        this.start = createVector(x1, y1);
        this.end = createVector(x2, y2);
        this.dir = createVector(this.end.x-this.start.x, this.end.y-this.start.y);
        this.angle = degrees(this.dir.heading());
        this.reflection = 1; // wie stark reflektiert diese Wand?
    }

    draw() {
        stroke(primaryColor);
        strokeWeight(2);
        line(this.start.x, this.start.y, this.end.x, this.end.y);

        if (constructionMode) {
            fill(primaryColor);
            ellipse(this.start.x, this.start.y, 10);
            ellipse(this.end.x, this.end.y, 10);
        }
    }
}
