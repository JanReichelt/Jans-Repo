//// THX PAUL! THX BERND!


/// Get Resources
const minePic = new Image();
minePic.src = 'mine.png';
const clockUI = document.getElementById('clock');
let clockCount;

/// Set Canvas
let canvas = document.getElementById('board');
canvas.width = 700;
canvas.height = 700;

let c = canvas.getContext('2d');
c.fillStyle = "#eee";
c.fillRect(0, 0, canvas.width, canvas.height);
c.strokeStyle = 'teal';
c.rect(2, 2, canvas.width-4, canvas.height-4);
c.stroke();

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
                    if (event.altKey == true) {
                        if (g.grid[i].flag == false) {
                            g.grid[i].flag = true;
                        } else {
                            g.grid[i].flag = false;
                        }
                        g.grid[i].show();
                    } else {
                        if (g.moveNr == 0) {
                            g.setMines(i, g.mineNr);
                            g.showGrid();
                            clockCount = setInterval(() => {
                                g.clock += 1;
                                console.log(g.clock);
                                clockUI.innerHTML = g.clock;
                                if (g.clock % 10 == 0 && g.clock > 1) g.addMine();
                            }, 1000);
                        }
                        g.grid[i].unveil();
                        g.moveNr++;
                        g.checkWin();
                    }
                }
            }
        }
    }
}

/// Classes
class Game {
    constructor(col, row, mineNr){
        this.mineNr = mineNr;
        this.cols = col;                            // Anzahl der Spalten, die der Spieler zu Beginn auswählt.
        this.rows = row;                            // Anzahl der Zeilen, die der Spieler zu Beginn auswählt.
        this.w = (canvas.width - 4) / this.cols;    // die Breite und Höhe der Felder.
        this.moveNr = 0;                            // Zähler der im Spiel getätigten Züge.
        this.grid = new Array(this.cols*this.rows).fill(undefined);// Container für alle Field-Objekte auf dem Brett.
        this.clock = 0;
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
            if ((item.i*g.cols+item.j) !== index &&
                (item.i*g.cols+item.j) !== index - 1 &&
                (item.i*g.cols+item.j) !== index + 1 &&
                (item.i*g.cols+item.j) !== index + g.cols &&
                (item.i*g.cols+item.j) !== index - g.cols &&
                 item.state !== 'mine') {
             //Das unten ist der Versuch dafür zu sorgen, dass man beim ersten Klick nie auf einer Zahl landet
            // console.log(index);
            // console.log(`index+1 = ${index+1}`);
            // console.log(`index-1 = ${index+1}`);
            // console.log(`index+1+cols = ${index+1+g.cols}`);
            // if ((item.i*g.cols+item.j) < index - 1 || (item.i*g.cols+item.j) > index + 1 &&
            //     (item.i*g.cols+item.j) < index + g.cols - 1 || (item.i*g.cols+item.j) > index + g.cols + 1 &&
            //     (item.i*g.cols+item.j) < index - g.cols - 1 || (item.i*g.cols+item.j) > index - g.cols + 1 &&
            //      item.state !== 'mine') {
            //          console.log("met conditions");
            //          console.log(item);
            //          console.log(`index+1+cols = ${index+g.cols} -- index-cols = ${index-g.cols}`);
                item.state = 'mine';
                i++;
            }
        }

        for(let j = 0; j < g.grid.length; j++) {
            this.grid[j].setState();
        }
    }

    addMine() {
        let hiddenFields = this.grid.filter((item) => {
            return (item.hidden == true && item.state !== 'mine');
        });
        console.log(hiddenFields);
        if (hiddenFields.length > 0) {
            hiddenFields[Math.floor(Math.random()*hiddenFields.length)].state = 'mine';
            this.grid.forEach((i) => i.setState());
            this.showGrid();
        } else {
            let msg = alert('GEWONNEN!! Nochmal versuchen?');
            canvas.removeEventListener('click', clickHandler, false);
            clearInterval(clockCount);
            this.restart();
        }
    }

    restart() {
        console.log("restart!!");
        this.setGrid();
        this.moveNr = 0;
        this.clock = 0;
        clearInterval(clockCount);
        clockUI.innerHTML = this.clock;
        canvas.addEventListener('click', clickHandler, false);
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
            canvas.removeEventListener('click', clickHandler, false);
            clearInterval(clockCount);
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
        this.flag = false;
        this.state = 'empty'    // [mine, empty, minecount]
    }

    show() {
        c.lineWidth = 2;
        c.strokeStyle = 'teal';
        c.fillStyle = '#eee';
        c.beginPath();
        c.rect(this.x+3, this.y+3, this.w-2, this.w-2);
        c.stroke();
        c.fill();

        if (this.hidden == false) {
            c.rect(this.x+2, this.y+2, this.w-2, this.w-2);
            c.fillStyle = 'teal';
            c.fill();
            c.stroke();

            c.fillStyle = 'white';
            c.font = `${g.w*0.8}px Arial`;
            if (this.state !== 'mine' && this.state !== 'empty') {
                c.fillText(`${this.state}`, (this.x+this.w*3/10), (this.y+this.w*8/10));
            }

            if (this.state == 'mine') {
                c.rect(this.x+2, this.y+2, this.w-2, this.w-2);
                c.fillStyle = 'red';
                c.fill();
                c.drawImage(minePic, this.x+2+g.w*0.1, this.y+2+g.w*0.1, g.w-(g.w*0.2), g.w-(g.w*0.2));
                console.log("drew image");
            } else if (this.state == 0) {
                c.rect(this.x+2, this.y+2, this.w-2, this.w-2);
                c.fillStyle = 'teal';
                c.fill();
            }
        } else if (this.hidden == true && this.flag == true) {
            c.beginPath();
            c.strokeStyle = 'teal';
            c.fillStyle = 'orange';
            c.lineWidth = 2;
            c.moveTo(this.x+g.w/8*3, this.y+g.w/8*7);
            c.lineTo(this.x+g.w/8*3, this.y+g.w/8*2);
            c.lineTo(this.x+g.w/8*6, this.y+g.w/8*3.5);
            c.lineTo(this.x+g.w/8*3, this.y+g.w/8*5);
            c.fill();
            c.stroke();
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
            canvas.removeEventListener('click', clickHandler, false);
            for(let i = 0; i < g.grid.length; i++) {
                if (g.grid[i].state == 'mine') {
                    g.grid[i].hidden = false;
                }
            }
            clearInterval(clockCount);
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

/// Get it running
let g = new Game(15, 15, 35);
g.setGrid();
