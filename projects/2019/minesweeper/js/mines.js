/// Set Canvas
let canvas = document.getElementById('board');
canvas.width = 500;
canvas.height = 500;

let c = canvas.getContext('2d');
c.fillStyle = "#eee";
c.fillRect(0, 0, canvas.width, canvas.height);


/// Click Handler
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
                    if (g.moveNr == 0) {
                        g.setMines(i, g.mineNr);
                        g.showGrid();
                    }
                    g.grid[i].unveil();
                }
            }
        }
        g.moveNr++;
        g.checkWin();
    }
}


class Game {
    constructor(col, row, mineNr){
        this.mineNr = mineNr;
        this.cols = col;                    // Anzahl der Spalten, die der Spieler zu Beginn auswählt.
        this.rows = row;                    // Anzahl der Zeilen, die der Spieler zu Beginn auswählt.
        this.w = canvas.width / this.cols;  // die Breite und Höhe der Felder.
        this.moveNr = 0;                    // Zähler der im Spiel getätigten Züge.
        this.grid = new Array(this.cols*this.rows).fill(undefined);// Container für alle Field-Objekte auf dem Brett.
    }

    setGrid() {
        for(let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Field(Math.floor(i/this.rows), i%this.cols, this.w);
        }
        canvas.addEventListener('click', clickHandler, false);
        this.showGrid();
    }

    showGrid() {
        for(let i = 0; i < this.grid.length; i++) {
            this.grid[i].show();
        }
    }

    setMines(index, nr) {
        let item;
        let i = 0;
        while(i < nr) {
            item = this.grid[Math.floor(Math.random()*this.grid.length)];
            if ((item.i*g.cols+item.j) !== index && item.state !== 'mine') {
                item.state = 'mine';
                i++;
            }
        }

        for(let j = 0; j < g.grid.length; j++) {
            this.grid[j].setState();
        }
    }

    restart() {
        console.log("restart!!!");
        this.setGrid();
        this.moveNr = 0;
    }

    index(i, j) {
    // finds the index of a intersection in the 1-dimensional grid-array
        if (i < 0 || j < 0 || i > g.cols-1 || j > g.rows-1) {
            return -1;
        }
        return j + i * g.cols;
    }

    checkWin() {
        let count = 0;
        let target = g.mineNr;
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i].hidden == true) {
                count++;
            }
        }

        if (count == target) {
            let msg = alert('GEWONNEN!! Nochmal versuchen?');
            return true;
        }
    }
}

class Field {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.w = w;
        this.x = this.j * this.w;
        this.y = this.i * this.w;
        this.hidden = true;
        this.state = 'empty'// [mine, empty, minecount]
    }

    show() {
        c.beginPath();
        c.rect(this.x, this.y, this.w, this.w);
        c.lineWidth = 1;
        c.strokeStyle = 'teal';
        c.stroke();

        c.rect(this.x, this.y, this.w, this.w);
        c.fillStyle = '#eee';
        c.fill();

        if (this.hidden == false) {
            c.rect(this.x, this.y, this.w, this.w);
            c.fillStyle = 'teal';
            c.fill();

            c.fillStyle = 'white';
            c.font = `${g.w*0.8}px Arial`;
            c.fillText(`${this.state}`, (this.x+this.w*3/10), (this.y+this.w*8/10));

            if (this.state == 'mine') {
                c.rect(this.x, this.y, this.w, this.w);
                c.fillStyle = 'red';
                c.fill();
            } else if (this.state == 0) {
                c.rect(this.x, this.y, this.w, this.w);
                c.fillStyle = 'teal';
                c.fill();
            }
        }
    }

    setState() {
        if (this.state !== 'mine') {
            this.state = this.checkNeighbors();
        }
    }

    unveil() {
        if (this.state !== 'mine') {
            if (this.state == 0) {
                this.neighbors.forEach((n) => {
                    if (n.state !== 'mine' && n.hidden == true) {
                        n.hidden = false;
                        n.show();
                        n.unveil();
                    }
                });
            } else {
                this.hidden = false;
                this.show();
            }
        }

        if (this.state == 'mine') {
            for (let j = 0; j < g.cols*g.rows; j++) {
                this.hidden = false;
                this.show();
            }
            let msg = alert('VERLOREN!! Nochmal versuchen?');
            for(let i = 0; i < g.grid.length; i++) {
                if (g.grid[i].state == 'mine') {
                    g.grid[i].hidden = false;
                }
            }
            g.showGrid();
        }
    }

    get neighbors(){
        // Erzeugt die Nachbarn eines Fields und übergibt sie dem neighbors-Array.
        let neighbors = [];

        for(let i = this.i-1; i <= this.i+1; i++) {
            for(let j = this.j-1; j <= this.j+1; j++) {
                 if (i >= 0 && i < g.rows && j >= 0 && j < g.cols) {
                    neighbors.push(g.grid[g.index(i, j)]);
                }
            }
        }
        return neighbors;
    }

    checkNeighbors() {
        let mines = 0;
        this.neighbors.forEach((n)=>{
            if (n.state == 'mine') {
                mines++;
            }
        });
        return mines;
    }
}

/// Run board

let g = new Game(15, 15, 20);
g.setGrid();
