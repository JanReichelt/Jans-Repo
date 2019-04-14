class Game {
    constructor(col, row){
        this.cols = col;        // Anzahl der Spalten, die der Spieler zu Beginn auswählt.
        this.rows = row;        // Anzahl der Zeilen, die der Spieler zu Beginn auswählt.
        this.w = canvas.width / this.cols; // die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.
        this.lastMove = 'w';    // Zum Ermitteln des nächsten Zugs. 'w', 'b', 'passW', 'passB'.
        this.moveNr = 0;        // Zähler der im Spiel getätigten Züge.
        this.grid = [];         // Container für alle Intersection-Objekte auf dem Brett.
        this.moves = [];
        this.captured = {
            white: 0,
            black: 0
        };
        this.komi = komiInput.value;
        console.log(`komi: ${this.komi}`);


        console.log(`Game constructor mit ${this.cols} und ${this.rows} aufgerufen.`);
        console.log(`this.w: ${this.w}`);
        console.log(`canvas.width: ${canvas.width}`);
        console.log(`canvas.clientWidth: ${canvas.clientWidth}`);

        // Grid erstellen. grid.length ergibt sich aus der User-Eingabe cols und rows.
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++){
                this.grid.push(new Intersection(i, j, 'empty', this));
            }
        }
    }


    showBoard(moveNumber = 0) {
        // Stellt alle Intersections im grid als Spielbrett dar.
        for (let i = 0; i < this.cols*this.rows; i++) {
            if (this.grid[i] != undefined) { //Die Prüfung scheint nicht wirklich nötig zu sein, wenn alle Intersections definiert sind.
                this.grid[i].showIntersection();
            }
        }
    }

    move(intersection) {
        // Prüft, von welcher Farbe der letzte Zug war
        // Setzt Intersection auf die entsprechend andere Farbe
        if (game.lastMove === 'w' || game.lastMove === 'passW'){
            intersection.state = 'black';
            intersection.showIntersection();
            game.lastMove = 'b'
        } else if (game.lastMove === 'b' || game.lastMove === 'passB'){
            intersection.state = 'white';
            intersection.showIntersection();
            game.lastMove = 'w';
        }

        this.moveNr++;

        // Erfassen der relevanten Freiheiten und fangen der Gruppen ohne Freiheiten
        intersection.neighbors.forEach(neighbor => {
            if (neighbor.state !== intersection.state && neighbor.state !== 'empty') {
                if (neighbor.liberties === 0) {
                    neighbor.take();
                }
            }
        });

        if (intersection.liberties === 0) {
            this.resetMove(intersection);
        }

        this.saveMove();
        console.log(intersection.group);
        console.log(intersection.liberties);
    }

    resetMove(intersection) {
        if (intersection.liberties === 0) {
            this.moveNr--;
            intersection.state = 'empty';
            this.lastMove = (this.lastMove === 'w') ? 'b': 'w';
            c.clearRect(intersection.x, intersection.y, game.w, game.w);
            intersection.showIntersection();
            alert('Nicht genügend Freiheiten.');
            this.moves.pop();
        }
    }

    pass() {
        this.moveNr++;

        if (this.lastMove == 'passW' || this.lastMove == 'passB') {
            this.endGame();
        } else if (this.lastMove === 'w'){
            this.lastMove = 'passB';
        } else if (this.lastMove === 'b') {
            this.lastMove = 'passW';
        }

        this.saveMove();
        this.moveUI();
    }

    moveUI() {
        moveNrOutput.innerHTML = this.moveNr;
        capturedWhiteOutput.innerHTML = this.captured.black;
        capturedBlackOutput.innerHTML = this.captured.white;

        if (this.lastMove === 'w' || this.lastMove === 'passW') {
            moveColorOutput.innerHTML = 'schwarz';
        } else if (this.lastMove === 'b' || this.lastMove === 'passB') {
            moveColorOutput.innerHTML = 'weiß';
        }
    }

    endGame() {
        alert('Das Spiel ist beendet.\nBitte die toten Gruppen markieren.');
        canvas.removeEventListener('click', mouse, false);
        canvas.addEventListener('click', markDeadGroups, false);
        endGamePanel.classList.remove('hidden');
        inGamePanel.classList.add('hidden');
    }

    markGroups(intersection) {
        intersection.group.forEach(member => {
            if (member.marked === false) {
                c.beginPath();
                c.arc(member.x+this.w/2, member.y+this.w/2, (game.w/2), 0, (2*Math.PI));
                c.lineWidth = 4;
                c.fillStyle = '#FF000044';
                c.fill();
                member.marked = true;
            } else {
                c.clearRect(member.x, member.y, game.w, game.w);
                member.showIntersection();
                member.marked = false;
            }
        });
    }

    saveMove() {
        console.log("save the move!");
    }

    count() {

        // let confirmed = confirm('Das Spiel wird jetzt ausgezählt.\nSicher, dass alle Gruppen richtig markiert sind?');
        if (confirm('Das Spiel wird jetzt ausgezählt.\nSicher, dass alle Gruppen richtig markiert sind?')) {
            canvas.removeEventListener('click', markDeadGroups, false);

            let marked = this.grid.filter(intersection => intersection.marked);
            const points = {
                white: 0,
                black: 0
            }
            let winner;

            marked.forEach(intersection => {
                if (intersection.state === 'white') {
                    this.captured.white++;
                } else if (intersection.state === 'black') {
                    this.captured.black++;
                }
                intersection.state = 'empty'
            });

            let emptyIntersections = this.grid.filter(intersection => intersection.state === 'empty');
            while(emptyIntersections.length > 0) {
                this.grid.forEach(intersection => {
                    if (intersection.state !== 'empty') {
                        intersection.neighbors.forEach(neighbor => {
                            if (neighbor.state === 'empty') {
                                neighbor.state = intersection.state;
                            }
                        });
                    }
                });
                emptyIntersections = game.grid.filter(intersection => intersection.state === 'empty');
            }

            this.grid.forEach(intersection => {
                if (intersection.state === 'black'){
                    points.black++;
                } else if (intersection.state === 'white'){
                    points.white++;
                }
            });

            let countKomi = Number(this.komi);
            if (countKomi !== NaN) {
                points.white += countKomi;
            }

            if (points.white < points.black) {
                winner = 'black';
            } else if (points.white > points.black) {
                winner = 'white'
            } else {
                winner = 'none';
            }

            c.clearRect(0, 0, canvas.width, canvas.height);
            this.showBoard();
            this.moveUI();
            countBtn.disabled = true;
            pointsW.innerHTML = points.white;
            pointsB.innerHTML = points.black;
            winnerOutput.innerHTML = (winner === 'black') ? `S+${points.black - points.white}` : `W+${points.white - points.black}`;
            alert(`Gewonnen hat ${(winner === 'black') ? 'schwarz' : 'weiß'}.\nDer Punktestand lautet:\nWeiß: ${points.white}\nSchwarz: ${points.black}.`)
            startGamePanel.classList.remove('hidden');
        }
    }
}
