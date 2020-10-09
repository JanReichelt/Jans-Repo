/*
    CodingTrain - QuadTree(1): https://www.youtube.com/watch?v=OJxEcs0w_kE
    CodingTrain - QuadTree(2): https://www.youtube.com/watch?v=QQx_NmCIuCY&t=377s
*/
let qtree;
let range;
let radio;

function setup() {
    createCanvas(800, 800);

    radio = createRadio();
    radio.option('Circle');
    radio.option('Square');
    radio.selected('Circle');
    radio.style('width', '160px');

    qtree = new QuadTree(0, 0, width, height, 4); // x, y, w, h, capacity
    let pointCount = 4500;

    for(let i = 0; i < pointCount; i++) {
        let p = new Point(random(width), random(height));
        qtree.insert(p);
    }
}

function draw() {
    if (mouseIsPressed) {
        let m = new Point(mouseX,mouseY);
        qtree.insert(m);
    }
    background(22);
    qtree.show();

    stroke(0, 255, 0);
    strokeWeight(3);
    if (radio.value() === 'Square') {
        range = new Rectangle(mouseX, mouseY, 350, 350);
        rect(range.x, range.y, range.w, range.h);
    } else {
        range = new Circle(mouseX, mouseY, 350);
        ellipse(range.x, range.y, range.r);
    }

    let pts = qtree.query(range);
    // console.log(pts);
    pts.forEach(p => {
        stroke(0,255,0);
        strokeWeight(8);
        point(p.x, p.y);
    })
}
