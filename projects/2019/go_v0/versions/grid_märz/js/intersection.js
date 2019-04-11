class Intersection{
    constructor(i, j, state, game) {
        this.i = i;             // i steht für die Spalte und j für die Zeile
        this.j = j;
        this.state = state;   // 'empty', 'white', 'black'
        this.neighbors = {};
        this.x = this.i * game.w;
        this.y = this.j * game.w;
        this.groupIndex;
    }

    setNeighbors(){
        // Erzeugt die Nachbarn einer Intersection und übergibt sie dem neighbors-Objekt.
        this.neighbors.top     = g.grid[index(this.i, this.j-1)];
        this.neighbors.right   = game.grid[index(this.i+1, this.j)];
        this.neighbors.bottom  = game.grid[index(this.i, this.j+1)];
        this.neighbors.left    = game.grid[index(this.i-1, this.j)];
    }

    showIntersection() {
        // Darstellung der einzelnen Intersections (Linien und Steine der richtigen Farbe).
        let wx = 0;
        let wy = 0
        const n = Object.entries(this.neighbors);

        // console.log(`---`);
        // console.log(`i: ${this.i} | j: ${this.j}`);
        // console.log(`x: ${this.x} | y: ${this.y}`);

        for (const [direction, neighbor] of n) {
        // Prüfen wo der aktuelle Nachbar liegt, damit die Linie in die richtige Richtung gezeichnet wird.
            if (neighbor) {
                if (neighbor.i < this.i) {
                    wx = -(w/2);
                } else if (neighbor.i > this.i) {
                    wx = (w/2);
                } else {
                    wx = 0;
                }

                if (neighbor.j < this.j) {
                    wy = -(w/2);
                } else if (neighbor.j > this.j) {
                    wy = (w/2);
                } else {
                    wy = 0;
                }

                c.beginPath();
                c.moveTo(this.x + (w/2), this.y + (w/2));
                c.lineTo((this.x + (w/2) + wx), (this.y + (w/2) + wy))
                c.lineWidth = 2;
                c.strokeStyle = 'black';
                c.stroke();
            }
        }

        if (this.state == 'black') {
            c.drawImage(black, this.x, this.y, w-(w*0.05), w-(w*0.05));
        } else if (this.state == 'white') {
            let randStone = whiteStones[Math.floor(Math.random() * whiteStones.length)];
            this.whiteStone = randStone;
            c.drawImage(this.whiteStone, this.x, this.y, w-(w*0.05), w-(w*0.05));
        }
    }

    get group() {
        if (groups.length > 0) {
            return groups[this.groupIndex];
        } else {
            return null;
        }
    }

    setGroup(){
        // Führt alle Prüfungen aus, die zur Erstellung der Gruppe und der Gruppenmember nötig sind.
        // Erzeugt Gruppen und ermittelt die Member einer Gruppe.
        let liberties = 0;
        let same_neighbors = 0;
        let same_neighbors_liberties = 0;
        let diff_neighbors = 0;

        for (let elem in this.neighbors) {
            if (this.neighbors[elem]) {
                if(this.neighbors[elem].state == 'empty') {
                    liberties++;
                } else if (this.neighbors[elem].state == this.state){
                    same_neighbors++;
                    console.log("Freiheiten der Nachbargruppen:" + this.neighbors[elem].group.liberties);
                    same_neighbors_liberties += this.neighbors[elem].group.liberties
                } else if (this.neighbors[elem].state != this.state
                        && this.neighbors[elem].state != 'empty') {
                    diff_neighbors++;
                }
            }
        }

         if (!(liberties == 0 && same_neighbors_liberties == 0)) {
            // console.log("nicht setzen!!");
            // this.dead = true;
            // Prüfung einbauen, dass sich Gruppen nicht selbst fangen können!
        }

        // Logik zum Zuordnen der Gruppen und Member
        groups.push(new Group(this)); // wäre groups.unshift() eine Optimiereung, da nicht mehr so viele groupindices angepasst werden müssen, wenn eine Gruppe aus dem groups-Array entfernt wird?
        // console.log("neue Gruppe erstellt");
        this.groupIndex = groups.length - 1;
            // Das kann nicht in den Group-Constructor stehen, da ich innerhalb des Group-Constructors noch nicht von außen auf die Gruppe zugreifen kann.
            // Außerdem kann ich diesen GroupIndex nicht mit setIndex erstellen, da setIndex über den group-getter schon auf den GroupIndex der Intersection zugreift und deshalb vorher schon definiert sein muss.
        this.group.setIndex();


        if (same_neighbors >= 1) {
            let sNGroup;
            for (let elem in this.neighbors) {
                if (this.neighbors[elem]) {
                    if (this.neighbors[elem].state == this.state) {
                        sNGroup = this.neighbors[elem].group;
                        sNGroup.members.forEach(memb => {
                            this.group.members.add(memb)
                    });
                        groups.splice(groups.indexOf(sNGroup), 1);
                        groups.forEach(group => group.setIndex());
                    }
                }
            }
        }

        if (diff_neighbors >= 1) {
            let dNGroup;
            let li;
            for (let elem in this.neighbors) {
                if (this.neighbors[elem]) {
                    if (this.neighbors[elem].state != this.state
                    && this.neighbors[elem].state != 'empty') {
                        dNGroup = this.neighbors[elem].group;
                        li = dNGroup.liberties;
                    }
                }
            }
        }
    }

    move() {
        // Prüft, von welcher Farbe der letzte Zug war
        // Setzt Intersection auf die entsprechend andere Farbe

        //this.setGroup(); //Eventuell an den Anfang der move-Methode setzen (wenn möglich), dann folgt die Darstellung der Steine erst auf die validierte Erzeugun der Gruppe.

        if (lastMove == 'w' || lastMove == 'passw'){
            this.state = 'black';
            this.showIntersection();
            lastMove = 'b'
        } else if (lastMove == 'b' || lastMove == 'passb'){
            this.state = 'white';
            this.showIntersection();
            lastMove = 'w';
        }

        this.setGroup(); //Eventuell an den Anfang der move-Methode setzen (wenn möglich), dann folgt die Darstellung der Steine erst auf die validierte Erzeugun der Gruppe.

        const n = Object.entries(this.neighbors);
        for (const [direction, neighbor] of n) {
            if(neighbor && neighbor.group) {  // Nur, wenn der Nachbar eine Intersection ist (also nicht über Rand) und eine Gruppe hat (also nicht leer).
                console.log('gegnerische Freiheiten: ' + neighbor.group.liberties);
                if(neighbor.group.liberties == 0) {
                    neighbor.group.takeGroup()
                }
            }
        }
        console.log("eigene Freiheiten: " + this.group.liberties);
        if (this.group.liberties == 0) {
            console.log(this.group);
            this.group.takeGroup();
        }
        // game.saveMove();
        // game.moveUI();
    }
}
