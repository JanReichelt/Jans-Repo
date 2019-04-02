let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 1024;

let colors = ['blue', 'red', 'green', 'yellow'];

  class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 25;
    }

    show() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        //c.lineWidth = 2;
        c.fillStyle = this.color;
        c.fill();
    }
}

class Line{
    constructor(x) {
        this.x = x;
        this.line = [];

        for (let i = 1; i <= 4; i++) {
            this.line.push(new Ball(this.x, i*75, 'white'));
        }
    }


    show() {
        for (let i = 0; i <= 4; i++) {
            this.line[i].show();
        }
    }
}

class Board {

    constructor() {
        const board = [];
        for(let i = 1; i <= 8; i++) {
            board.push(new Line(i*75));
            board[i-1].show();
        }
    }
}

const board = new Board();
