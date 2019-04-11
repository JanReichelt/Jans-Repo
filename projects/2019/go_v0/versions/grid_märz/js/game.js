class Game {
    constructor(col, row) {
        this.cols = col;    // Anzahl der Spalten, die der Spieler zu Beginn auswählt.
        this.rows = row;    // Anzahl der Zeilen, die der Spieler zu Beginn auswählt.
        this.w = canvas.width / this.cols; //// die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.

        this.moveCounter = 0;
        this.lastMove = 'w'; // Was war der letzte Zug? Nächster Zug in anderer Farbe. Spiel beginnt mit "s".
        this.gameState = 'inGame' // 'start', 'inGame', 'end'
        this.captured = {
            white: 0,
            black: 0
        };

        this.grid = [];    // Container für alle Intersection-Objekte auf dem Brett.
        this.moves = [];   // Hier wird der Spielablauf gespeichert als geordnete Menge an grids. Anzahl der Züge ist moves.length-1.
        this.groups = [];  // Container für alle Stein-Gruppen im Spiel.


        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++){
                this.grid.push(new Intersection(i, j, 'empty', this));
            }
        }

        for (let i = 0; i < this.cols*this.rows; i++) {
            this.grid[i].setNeighbors();
        }
    }

    showBoard(moveNumber = 0) {
        // Stellt alle Intersections im grid als Spielbrett dar.
        for (let i = 0; i < this.cols*this.rows; i++) {
            if (this.grid[i] != undefined) {
                this.grid[i].showIntersection();
            }
        }
    }


    saveMove() {
        // Speichert die aktuelle Stellung (=grid) im moves-array.
        // Sehr aufwändig, da bei jedem Zug ein komplett neues grid erzeugt werden muss. Geht das besser?
        // Vll. direkt grid auf diese Weise immer neu erzeugen und anzeigen lassen, statt immer im grid zu arbeiten und zusätzlich arr zu erstellen?!
        // ich muss klären, was passiert, wenn ich drei Züge zurückskippe und dann einen Stein setze
        // Dafür muss ich noch eine Sicherheit erstellen, damit das entweder nicht geht (noMOve und im move() die Bedingung if !noMove)
        // oder, dass die Option erst auftaucht, sobald das Spiel beendet und ausgewertet ist.


        const arr = [];
        this.grid.forEach(intersection => {
            const obj = new Intersection(intersection.i, intersection.j, intersection.state, this);
            arr.push(obj);
        });

        // TODO: Prüfen ob und warum die map/...-Funktion funktioniert
        // const arrIntersection = grid.map(intersection => { return {...intersection} } );
        // console.log(arrIntersection);

        for (let i = 0; i < this.cols*this.rows; i++) {
            arr[i].setNeighbors();
        }
        this.moves.push(arr);

        this.moveCounter = this.moves.length;
        console.log("Zug: " + this.moveCounter);
        console.log(this.moves);
    }

    static moveUI() {
        moveNr.innerHTML = this.moveCounter;

        if (this.lastMove == 'w' || this.lastMove == 'passw') {
            moveColor.innerHTML = 'S';
        } else if (this.lastMove == 'b' || this.lastMove == 'passb') {
            moveColor.innerHTML = 'W';
        }

        capStonesW.innerHTML = this.captured.white;
        capStonesB.innerHTML = this.captured.black;
    }

    endGame() {
        console.log("now count and end the game");
        // count()
        // display Result
        // let results = document.getElementById('results');
        // results.innerHTML = "Gewonnen hat ..."
        inGamePanel.className = 'hidden';
    }
}
