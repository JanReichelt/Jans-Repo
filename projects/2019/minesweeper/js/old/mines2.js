/// Set Canvas
let canvas = document.getElementById('board');
let c = canvas.getContext('2d');
// canvas.width = 1024;
// canvas.height = 1024;
canvas.width = 500;
canvas.height = 500;
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


class Field {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.w = w;
        this.x = this.i * this.w;
        this.y = this.j * this.w;
        this.hidden = true;
        this.state = 'empty'// [mine, empty, clicked]
    }

    show() {
        c.beginPath();
        c.rect(this.x, this.y, this.w, this.w);
        c.lineWidth = 1;
        c.strokeStyle = 'teal';
        c.stroke();
        c.fillStyle = '#eee';
        c.fill();
        if (this.hidden == false) {
            c.rect(this.x, this.y, this.w, this.w);
            c.fillStyle = 'teal';
            c.fill();
            if (this.state === 'mine') {
                c.rect(this.x, this.y, this.w, this.w);
                c.fillStyle = 'red';
                c.fill();
            }
        }
    }

    index(i, j) {
    // finds the index of a intersection in the 1-dimensional grid-array
        if (i < 0 || j < 0 || i > g.cols-1 || j > g.rows-1) {
            return -1;
        }
        return i + j * g.cols;
    }

    get neighbors(){
        // Erzeugt die Nachbarn eines Fields und übergibt sie dem neighbors-Objekt.
        let neighbors = [];

        if (this.j-1 >= 0) {
            neighbors.push(g.grid[this.index(this.i-1, this.j-1)]);
            neighbors.push(g.grid[this.index(this.i, this.j-1)]);
            neighbors.push(g.grid[this.index(this.i+1, this.j-1)]);
        } else if (this.j+1 <= g.cols) {
            neighbors.push(g.grid[this.index(this.i-1, this.j+1)]);
            neighbors.push(g.grid[this.index(this.i, this.j+1)]);
            neighbors.push(g.grid[this.index(this.i+1, this.j+1)]);
        } else if (this.j) {
            neighbors.push(g.grid[this.index(this.i-1, this.j+1)]);
            neighbors.push(g.grid[this.index(this.i+1, this.j+1)]);
        }

        neighbors = neighbors.filter(neighbor => neighbor !== undefined);
        console.log(neighbors);
        return neighbors;
    }

    unveil() {
        this.hidden = false;
        this.show();

        if (this.state == 'mine') {
            for (let j = 0; j < g.cols*g.rows; j++) {
                this.hidden = false;
                this.show();
            }
            let msg = alert('VERLOREN!! Nochmal versuchen?');
            g.restart();
        }
    }


    checkNeighbors() {

    }
}


function clickHandler(event) {
    console.log(event);
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (g) {
        for (let i = 0; i < g.cols*g.rows; i++) {
            if (mouseX >= g.grid[i].x
            && mouseX <= g.grid[i].x + g.w
            && mouseY <= g.grid[i].y + g.w
            && mouseY >= g.grid[i].y) {

                if (g.grid[i].hidden == true){
                    if (g.firstMove == true) {
                        g.setMines(i);
                        g.grid[i].unveil();
                        g.firstMove = false;
                    } else {
                        g.grid[i].unveil();
                    }

                    //Neighbors test
                    var test = g.grid[i].neighbors;
                }
            }
        }

    }

}

class Game {
    constructor(col, row, mineNr){
        this.mineNr = mineNr;
        this.cols = col;                    // Anzahl der Spalten, die der Spieler zu Beginn auswählt.
        this.rows = row;                    // Anzahl der Zeilen, die der Spieler zu Beginn auswählt.
        this.w = canvas.width / this.cols;  // die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.
        this.moveNr = 0;                    // Zähler der im Spiel getätigten Züge.
        this.grid = new Array(this.cols*this.rows).fill(undefined);// Container für alle Field-Objekte auf dem Brett.
        this.firstMove = true;
        console.log(`w: ${this.w}`);
    }



    setGrid() {
        for(let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Field(i%this.cols, Math.floor(i/this.cols), this.w);
        }
        canvas.addEventListener('click', clickHandler, false);
        this.showGrid();
    }


    setMines(index) {
        let item;
        let i = 0;
        while(i <= this.mineNr) {
            item = this.grid[Math.floor(Math.random()*this.grid.length)];
            if ((item.j*this.col+item.i) !== index && item.state !== 'mine') {
                item.state = 'mine';
                i++;
            }
        }
    }

    showGrid() {
        for(let i = 0; i < this.grid.length; i++) {
            this.grid[i].show();
        }
    }

    restart() {
        this.setGrid();
        this.setMines();
        this.firstMove = true;
    }
}

let g = new Game(18, 18, 250);
g.setGrid();
console.log(g);













// EOF
