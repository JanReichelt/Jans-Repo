/// Set Canvas
let canvas = document.getElementById('board');
let c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 1024;
c.fillStyle = "#eee";
c.fillRect(0, 0, canvas.width, canvas.height);


function resizeCanvasToDisplaySize() {
    // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
    // Die angezeigte Größe des Canvas ermitteln
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Wenn die Auflösung nicht mit der Größe übereinstimmt, anpassen
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        // // Und ggf. das Brett neu zeichnen
        // if (game) {
        //     game.w = canvas.width / game.cols;
        //     game.grid.forEach(intersection => {
        //         if (intersection !== undefined) {
        //             intersection.x = intersection.i * game.w;
        //             intersection.y = intersection.j * game.w;
        //         }
        //         c.clearRect(0, 0, canvas.width, canvas.height);
        //         game.showBoard();
        //     });
        //     // console.log(`Resized to width: ${canvas.width} and height: ${canvas.height}!!`);
        // }
        c.fillRect(0, 0, canvas.width, canvas.height);
        return true;
    }
    return false;
}

class Game {
    constructor(col, row){
        this.cols = col;                    // Anzahl der Spalten, die der Spieler zu Beginn auswählt.
        this.rows = row;                    // Anzahl der Zeilen, die der Spieler zu Beginn auswählt.
        this.w = canvas.width / this.cols;  // die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.
        this.moveNr = 0;                    // Zähler der im Spiel getätigten Züge.
        this.grid = new Array(this.cols*this.rows).fill(undefined);// Container für alle Intersection-Objekte auf dem Brett.
    }

    setMines() {

    }

    showGame() {
        for (let i = 0; i < this.cols*this.rows; i++) {
            this.grid[i].show();
        }
    }
}

class Field {

    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = this.i * g.w;
        this.y = this.j * g.w;
        this.hidden = true;
    }

    show() {
        c.beginPath();
        c.moveTo(this.x + (game.w/2), this.y + (game.w/2));
        c.lineTo((this.x + (game.w/2) + wx), (this.y + (game.w/2) + wy))
        c.lineWidth = 2;
        c.strokeStyle = "orange";
        c.stroke();
    }
}

let g = new Game(9, 9);
