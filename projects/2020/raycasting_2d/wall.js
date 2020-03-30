class Wall {
    constructor(x1, y1, x2, y2) {
        this.start = createVector(x1, y1);
        this.end = createVector(x2, y2);
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
