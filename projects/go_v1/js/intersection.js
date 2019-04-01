class Intersection{
    constructor(i, j, state, game) {
        this.i = i;             // i steht für die Spalte und j für die Zeile
        this.j = j;
        this.state = state;     // 'empty', 'white', 'black'
        this.x = this.i * game.w;
        this.y = this.j * game.w;
        this.marked = false;    // Boolean zur Vorbereitung zum Zählen.
        // console.log(`Intersection constructor mit ${this.i} und ${this.i} und ${this.state} aufgerufen.`);
    }


    index(i, j) {
    // finds the index of a intersection in the 1-dimensional grid-array
        if (i < 0 || j < 0 || i > game.cols-1 || j > game.rows-1) {
            return -1;
        }
        return i + j * game.cols;
    }


    get neighbors(){
        // Erzeugt die Nachbarn einer Intersection und übergibt sie dem neighbors-Objekt.
        const neighbors = [];
        if (this.j-1 >= 0)      {neighbors.push(game.grid[this.index(this.i, this.j-1)]);}
        if (this.i+1 < game.cols) {neighbors.push(game.grid[this.index(this.i+1, this.j)]);}
        if (this.j+1 < game.rows) {neighbors.push(game.grid[this.index(this.i, this.j+1)]);}
        if (this.i-1 >= 0)      {neighbors.push(game.grid[this.index(this.i-1, this.j)]);}

        return neighbors;
    }

    showIntersection(color='black') {
        // Darstellung der einzelnen Intersections (Linien und Steine der richtigen Farbe).
        let wx = 0;
        let wy = 0;

        this.neighbors.forEach(neighbor => {
            // Prüfen wo der aktuelle Nachbar liegt, damit die Linie in die richtige Richtung gezeichnet wird.
            if (neighbor.i < this.i) {
                wx = -(game.w/2);
            } else if (neighbor.i > this.i) {
                wx = (game.w/2);
            } else {
                wx = 0;
            }

            if (neighbor.j < this.j) {
                wy = -(game.w/2);
            } else if (neighbor.j > this.j) {
                wy = (game.w/2);
            } else {
                wy = 0;
            }

            c.beginPath();
            c.moveTo(this.x + (game.w/2), this.y + (game.w/2));
            c.lineTo((this.x + (game.w/2) + wx), (this.y + (game.w/2) + wy))
            c.lineWidth = 2;
            c.strokeStyle = color;
            c.stroke();
        });

        if (this.state === 'black') {
            c.drawImage(black, this.x, this.y, game.w-(game.w*0.05), game.w-(game.w*0.05));
        } else if (this.state === 'white') {
            let randStone = whiteStones[Math.floor(Math.random() * whiteStones.length)];
            this.whiteStone = randStone;
            c.drawImage(this.whiteStone, this.x, this.y, game.w-(game.w*0.05), game.w-(game.w*0.05));
        }
    }

    get group() {
        // Gibt ein Array mit allen Gruppenmitgliedern (angrenzende Steine gleicher Farbe) zurück
        const member = new Set();
        member.add(this);
        let toCheck = this.neighbors;

        while (toCheck.length > 0) {
            toCheck.forEach(check => {
                if (check.state === this.state && !member.has(check)) {
                    toCheck = toCheck.concat(check.neighbors);
                    member.add(check);
                    toCheck.splice(toCheck.indexOf(check),1);
                } else if (toCheck !== this.state || member.has(check)) {
                    toCheck.splice(toCheck.indexOf(check),1);
                }
            });
        }
        return member;
    }

    get liberties() {
        let liberties = new Set();

        this.group.forEach(member => {
            member.neighbors.forEach(neighbor => {
                if (neighbor.state === 'empty') {
                    liberties.add(neighbor);
                }
            });
        });
        return liberties.size;
    }

    take() {
        this.group.forEach(member => {
            if (member.state === 'white') {
                game.captured.white++;
            } else if (member.state === 'black') {
                game.captured.black++;
            }

            member.state = 'empty'

            c.clearRect(member.x, member.y, game.w, game.w);
            member.showIntersection();
        });
        return game.captured;
    }
}
