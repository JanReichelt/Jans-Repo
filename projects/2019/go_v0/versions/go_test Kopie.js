// white stones rendering by: zpmorgan https://github.com/zpmorgan/gostones-render


/// Set global variables
  const grid = [];    // Container für alle Intersection-Objekte auf dem Brett.
  const moves = [];   // Hier wird der Spielablauf gespeichert als geordnete Menge an grids. Anzahl der Züge ist moves.length-1.
  const groups = [];  // Container für alle Stein-Gruppen im Spiel.
  let cols, rows;     // Anzahl der Zeilen und Spalten, die der Spieler zu Beginn auswählt.
  let w;              // die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.
  let lastMove = 'w'; // Was war der letzte Zug? Nächster Zug in anderer Farbe. Spiel beginnt mit "s".

class Board {
  constructor(col, row) {
    cols = col;
    rows = row;
    w = canvas.width / cols;

    for(let j = 0; j < rows; j++) {
      for(let i = 0; i < cols; i++){
        grid.push(new Intersection(i, j));
      }
    }

    for (let i = 0; i < cols*rows; i++) {
      grid[i].setNeighbors();
    }
  }

  showBoard() {
    // Stellt alle Intersections im grid als Spielbrett dar.
    for (let i = 0; i < cols*rows; i++) {
      if (grid[i] != undefined) {
        grid[i].showIntersection();
      }
    }
  }
}

class UIHandler {
  constructor() {
    /// Load images (Stones)
    let black = new Image(); black.src = 'pics/black.png';
    let white1 = new Image(); white1.src = 'pics/white1.png';
    let white2 = new Image(); white2.src = 'pics/white2.png';
    let white3 = new Image(); white3.src = 'pics/white3.png';
    let white4 = new Image(); white4.src = 'pics/white4.png';
    let white5 = new Image(); white5.src = 'pics/white5.png';
    let white6 = new Image(); white6.src = 'pics/white6.png';
    let white7 = new Image(); white7.src = 'pics/white7.png';
    let white8 = new Image(); white8.src = 'pics/white8.png';
    let white9 = new Image(); white9.src = 'pics/white9.png';
    let white10 = new Image(); white10.src = 'pics/white10.png';
    let white11 = new Image(); white11.src = 'pics/white11.png';
    let white12 = new Image(); white12.src = 'pics/white12.png';
    let white13 = new Image(); white13.src = 'pics/white13.png';
    let white14 = new Image(); white14.src = 'pics/white14.png';

    let whiteStones = [];
    whiteStones.push(white1);
    whiteStones.push(white2);
    whiteStones.push(white3);
    whiteStones.push(white4);
    whiteStones.push(white5);
    whiteStones.push(white6);
    whiteStones.push(white7);
    whiteStones.push(white8);
    whiteStones.push(white9);
    whiteStones.push(white10);
    whiteStones.push(white11);
    whiteStones.push(white12);
    whiteStones.push(white13);
    whiteStones.push(white14);

    this.canvas;
    this.setCanvas();
    let b = new Board(9 , 9); //Immer die größere Zahl zuerst!!
    b.showBoard();
  }

  setCanvas() {
    /// Set Canvas
    this.canvas = document.getElementById('board');
    let parent = document.getElementById('container');
    parent.appendChild(this.canvas);

    this.canvas.width = 760;
    this.canvas.height = 760;

    let c = this.canvas.getContext('2d');
    this.canvas.addEventListener('click', this.mouse, false);
  }

  mouse(event) {
    this.canvas = document.getElementById('board');
    let mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

    for (let i = 0; i < cols*rows; i++) {
      if (mouseX >= grid[i].x
      && mouseX <= grid[i].x + w
      && mouseY <= grid[i].y + w
      && mouseY >= grid[i].y) {
        if (grid[i].state == 'empty'){
          grid[i].move();
          break;
        }
      }
    }
  }
}

// --- Get it going! ---
var start = new UIHandler();
