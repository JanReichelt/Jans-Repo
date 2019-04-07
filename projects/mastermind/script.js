let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 570;
c.fillStyle = "#AAA";
c.fillRect(0, 0, canvas.width, canvas.height);


const colors = ['#888', 'yellow', 'orange', 'red', 'purple', 'blue', 'green'];
const dist = 60;
const radius = 15;
const rows = 8;
const cols = 4;
const confirmBtn = document.getElementById('confirm');

class Ball {
    // Represents a single spot (or fill) on the board.
    constructor(x, y) {
        this.y = y;
        this.x = x;
        this.color = 0;  // Index of the global colors-array.
        this.editable = false;
    }

    show() {
        c.beginPath();
        c.arc(this.x, this.y, radius, 0, 2*Math.PI);
        c.fillStyle = colors[this.color];
        c.fill();

        c.beginPath();
        c.arc(this.x, this.y, radius+4, 0, 2*Math.PI);
        c.lineWidth = 2;
        c.strokeStyle = colors[0];
        c.stroke();
    }
}

class Line{
    // Represents the set of the balls in one row.
    constructor(y) {
        this.y = y;             // X-position of the Line in canvas.
        this.line = [];         // Collection of the four balls in this line.
        this.editable = false;  // Is the line editable by the player?

        // Fill the line with ball-objects.
        for (let i = 1; i <= cols; i++) {
            this.line.push(new Ball(i*dist-dist/3, this.y));
        }
    }

    show() {
        // Calls the show function of each ball in the line.
        for (let i = 0; i < cols; i++) {
            this.line[i].show();
        }

        let x = ((cols+1) * dist)-dist/2;
        this.fillResults(x-(radius/2), this.y-(radius/2), 0);
        this.fillResults(x+(radius/2), this.y-(radius/2), 0);
        this.fillResults(x-(radius/2), this.y+(radius/2), 0);
        this.fillResults(x+(radius/2), this.y+(radius/2), 0);
    }

    fillResults(x, y, result) {
        c.beginPath();
        c.arc(x, y, radius/3, 0, 2*Math.PI);

        if (result === 2) {
            c.fillStyle = 'black';
            c.fill();
        } else if (result === 1) {
            c.fillStyle = 'white'
            c.fill();
        } else {
            c.strokeStyle = '#888';
            c.lineWidth = 1;
            c.stroke();
        }
    }

    showResults(results) {
        results.sort((a, b) => b - a); // Sort in descending order, so that the rendering does'nt give hints.
        let x = ((cols+1) * dist)-dist/2;

        this.fillResults(x-(radius/2), this.y-(radius/2), results[0]);
        this.fillResults(x+(radius/2), this.y-(radius/2), results[1]);
        this.fillResults(x-(radius/2), this.y+(radius/2), results[2]);
        this.fillResults(x+(radius/2), this.y+(radius/2), results[3]);
    }

    toggleEditable() {
        // Set the line and it balls to (not/) editable.
        if (this.editable == true) {
            this.editable = false;
            this.line.forEach(ball => {
                ball.editable = false;
                this.highlightLine('#AAA');
            });
        } else {
            this.editable = true;
            this.highlightLine('yellow');
            this.line.forEach(ball => {
                ball.editable = true;
            });
        }
    }

    highlightLine(color) {
        // Frame around the current active line.
        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = 5;
        c.strokeRect(2, this.y-dist/2, canvas.width-5, dist);
    }
}

class Board {
    // Holds the complete board (lines and balls) and all game-related functions.
    constructor() {
        this.move = 0;          // The current line, which can be manipulated by the player.
        this.board = [];        // Collection of all lines.
        this.targetLine = [];   // The hidden line, that gets compared to the players input.

        c.fillStyle = "#AAA";
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Create all the lines (=cols) with (=rows) balls each.
        this.index = 1
        for(this.index; this.index <= rows; this.index++) {
            this.board.push(new Line(this.index*dist - dist/2));
            this.board[this.index-1].show();
        }

        // Create the hidden line with random balls.
        this.targetLine = new Line(this.index*dist - dist/2);
        this.targetLine.line.forEach(ball => {
            ball.color = Math.floor(Math.random() * (colors.length-1))+1;
        });
        this.board.push(this.targetLine);
        this.targetLine.show();  // Just for easier debugging.

        c.beginPath();
        c.moveTo(0, rows*dist);
        c.lineTo(canvas.width, rows*dist);
        c.lineWidth = 3;
        c.strokeStyle = '#888';
        c.stroke();
    }

    matchMove() {
        // Returns an array (results), which indicates the correctness of the player's move.
        let results = new Array(cols).fill(0); // 0 = no match, 1 = match, 2 = perfect match
        let line = this.board[this.move].line;
        let targetLine = this.targetLine.line;

        // Initialize color-object for already checked colors.
        let checked = {...colors};
        line.forEach(ball => {
            checked[ball.color] = 0;
        });

        // Initialize color-object for the target line.
        let tLineColor = {...colors};
        targetLine.forEach(tBall => {
            tLineColor[tBall.color] = 0;
        });

        // Count colors of target line
        targetLine.forEach(tBall => {
            tLineColor[tBall.color]++;
        });

        // Find perfect matches first.
        line.forEach((ball, index) => {
            if (ball.color === targetLine[index].color) {
                checked[ball.color]++;
                results[index] = 2;
            }
        });

        // Find imperfect matches.
        line.forEach((ball, index) => {
            targetLine.forEach(tBall => {
                if(checked[ball.color] < tLineColor[ball.color]) {
                    if(ball.color === tBall.color && results[index] === 0) {
                        checked[ball.color]++;
                        results[index] = 1;
                        return;
                    }
                }
            });
        });
        return results;
    }
}

function click() {
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    game.board.forEach(line => {
        line.line.forEach(ball => {
            if(mouseX > ball.x-radius*1.1
                    && mouseX < ball.x+radius*1.1
                    && mouseY > ball.y-radius*1.1
                    && mouseY < ball.y+radius*1.1) {
                if (ball.editable) {
                    if (ball.color < colors.length-1) {
                        ball.color++;
                    } else {
                        ball.color = 1; // Not 0, because colors[0] signifies an empty spot.
                    }
                    ball.show();
                }
            }
        });
    });
}

function startGame() {
    game = new Board();
    canvas.addEventListener('click', click, false);
    game.board[game.move].toggleEditable();
    confirmBtn.disabled = false;
}

function confirmMove() {
    // Handles each confirmed move trom the player.
    game.board[game.move].toggleEditable();
    game.board[game.move].showResults(game.matchMove());

    let sum = game.matchMove().reduce((total, result) => total + result);
    // Victory!
    if (sum === 2*cols) {
        game.targetLine.show();
        alert("Victory!\nTry it again! :)");

        confirmBtn.disabled = true;
        canvas.removeEventListener('click', click, false);
    }

    game.move++;

    // Defeat!
    if (game.move >= game.board.length-1) {
        game.targetLine.show();
        alert("Failure.\nTry it again! :)");

        confirmBtn.disabled = true;
        canvas.removeEventListener('click', click, false);
    }

    game.board[game.move].toggleEditable();
}
