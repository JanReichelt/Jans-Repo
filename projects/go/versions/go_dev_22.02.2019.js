// white stones rendering by: zpmorgan https://github.com/zpmorgan/gostones-render

window.onload = function(){

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

/// Set Canvas
  var canvas = document.getElementById('board');
  var parent = document.getElementById('container');
  parent.appendChild(canvas);

  canvas.width = 760;
  canvas.height = 760;

  let c = canvas.getContext('2d');

/// Set global variables
  const grid = [];    // Container für alle Intersection-Objekte auf dem Brett.
  const moves = [];   // Hier wird der Spielablauf gespeichert als geordnete Menge an grids. Anzahl der Züge ist moves.length-1.
  let cols, rows;     // Anzahl der Zeilen und Spalten, die der Spieler zu Beginn auswählt.
  let w;              // die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.
  let lastMove = 'w'; // Was war der letzte Zug? Nächster Zug in anderer Farbe. Spiel beginnt mit "s".

/// set classes
  class Intersection{
    constructor(i, j, state) {
      this.i = i;         // i steht für die Spalte und j für die Zeile
      this.j = j;
      this.state = state; // 'empty', 'white', 'black'
      this.neighbors = {};
      this.group = {};
      this.x = this.i * w;
      this.y = this.j * w;
    }

    setNeighbors(){
      // Erzeugt die Nachbarn einer Intersection und übergibt sie dem neighbors-Objekt.
      this.neighbors.top     = grid[index(this.i, this.j-1)];
      this.neighbors.right   = grid[index(this.i+1, this.j)];
      this.neighbors.bottom  = grid[index(this.i, this.j+1)];
      this.neighbors.left    = grid[index(this.i-1, this.j)];
    }

    showIntersection(color) {
      // Darstellung der einzelnen Intersections (Linien und Steine der richtigen Farbe).
      if (this.neighbors.top) {
        c.beginPath();
        c.moveTo(this.x+(w/2), this.y+(w/2));
        c.lineTo(this.x+(w/2), this.y);
        c.lineWidth = 2;
        c.strokeStyle = color;
        c.stroke();
      }

      if (this.neighbors.right) {
          c.beginPath();
          c.moveTo(this.x+(w/2), this.y+(w/2));
          c.lineTo(this.x+w, this.y+(w/2));
          c.lineWidth = 2;
          c.strokeStyle = color;
          c.stroke();
      }

      if (this.neighbors.bottom) {
          c.beginPath();
          c.moveTo(this.x+(w/2), this.y+(w/2));
          c.lineTo(this.x+(w/2), this.y+w);
          c.lineWidth = 2;
          c.strokeStyle = color;
          c.stroke();
      }

      if (this.neighbors.left) {
          c.beginPath();
          c.moveTo(this.x+(w/2), this.y+(w/2));
          c.lineTo(this.x, this.y+(w/2));
          c.lineWidth = 2;
          c.strokeStyle = color;
          c.stroke();
      }

      if (this.state == 'black') {
        c.drawImage(black, this.x, this.y, w-(w*0.05), w-(w*0.05));
      } else if (this.state == 'white') {
        let randStone = whiteStones[Math.floor(Math.random() * whiteStones.length)];
        this.whiteStone = randStone;
        c.drawImage(this.whiteStone, this.x, this.y, w-(w*0.05), w-(w*0.05));
      }
    }

    setGroup(){
      // Führt alle Prüfungen aus, die zur Erstellung der Gruppe und der Gruppenmember nötig sind.
      // Erzeugt Gruppen und ermittelt die Member einer Gruppe.

      // Variablen erstellen, die später als Bedingungen für die Regeln gebraucht werden.
      let liberties = 0;
      let same_neighbors = 0;
      let diff_neighbors = 0;

      for (let elem in this.neighbors) {
        if (this.neighbors[elem]) {
          if(this.neighbors[elem].state == 'empty') {
             liberties++;
          } else if (this.neighbors[elem].state == this.state){
            same_neighbors++;
          } else if (this.neighbors[elem].state != this.state
                    && this.neighbors[elem].state != 'empty') {
            diff_neighbors++;
          }
        }
      }

      // Logik zum Zuordnen der Gruppen und Member
      this.group = new Group(this);
      console.log("neue Gruppe");
      console.log(this.neighbors);
      if (same_neighbors >= 1) {
        for (let elem in this.neighbors) {
          console.log("-----");
          console.log(this.neighbors);
          console.log(elem);
          if (this.neighbors[elem]) {
            if (this.neighbors[elem].state == this.state) {
              this.group.uniquifyMembers(this); //--> offenbar entsteht das rekursive Element
              // dadurch, dass ein Member zweifach enthalten ist?! Deshalb ist es nicht mehr rekursiv,
              // wenn ich die uniquify hier aufrufe...dafür verfielfachen sich die Intersections...
              // GELÖST?????
              for (let i = 0; i < this.neighbors[elem].group.members.length; i++) {
                this.group.members.push(this.neighbors[elem].group.members[i]);
              }
              this.group.uniquifyMembers(this);
              this.group.setMembers(this);
            }
          }
        }
      }
    }
  }

  class Board {
    constructor(col, row) {
      cols = col;
      rows = row;
      w = canvas.width / cols;

      for(let j = 0; j < rows; j++) {
        for(let i = 0; i < cols; i++){
          grid.push(new Intersection(i, j, "empty"));
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
          grid[i].showIntersection("black");
        }
      }
    }
  }

  class Group{
    members = [];         // Hält fest welche Intersections sind in der eigenen Gruppe sind.
    constructor(intersection){
      this.members.push(intersection);
      let liberties = 0;  // Anzahl der Freiheiten einer Gruppe. Wird direkt beim setzen ermittelt. Beim setzen werden auch direkt die Freiheiten der angrenzenden Gruppen angepasst.
      let groupColor;     // Farbe der Gruppe.
     }

     setMembers(intersection) {
       // Verteilt die komplette Anzahl der Gruppenmitglieder auf alle Steine der Gruppe.
       console.log("setMembers aufgerufen");
       intersection.group.members.forEach(function(elem){
         console.log(elem);
         console.log(intersection.group.members);
         //Hier liegt das Problem!!
         // Das Problem liegt darin, dass sich Intersections und group.members
         // aufeinander beziehen und dadurch ein unendlicher Loop entsteht.
         // unendlich wird der Loop aber erst, wenn der neue Stein zwei Steine
         // derselben Farbe und Gruppe berührt...
         elem.group.members = intersection.group.members;
      });
     }

     uniquifyMembers(intersection) {
       // Entfernt Duplikate aus dem Array members durch die doppelte Umwandlung: Array --> Set --> Array
       let memberSet = new Set(intersection.group.members);
       // return Array.from(memberSet);
       intersection.group.members = Array.from(memberSet);
     }
  }

  function index(i, j) {
    // finds the index of a intersection in the 1-dimensional grid-array
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
      return -1
    }
    return i + j * cols;
  }

  function move(intersection) {
    // Prüft, von welcher Farbe der letzte Zug war
    // Setzt Intersection auf die entsprechend andere Farbe
    if (lastMove == 'w'){
      intersection.state = 'black';
      intersection.showIntersection("black");
      lastMove = 'b'
    } else if (lastMove == 'b'){
      intersection.state = 'white';
      intersection.showIntersection("black");
      lastMove = 'w';
    }
    intersection.setGroup();
  }

/// Get it going

  var b = new Board(9 , 9); //Immer die größere Zahl zuerst!!
  b.showBoard();

    function mouse(event) {
      var mouseX = event.clientX - canvas.getBoundingClientRect().left;
      var mouseY = event.clientY - canvas.getBoundingClientRect().top;

      if (event.type == 'click') {
        for (let i = 0; i < cols*rows; i++) {
          if (mouseX >= grid[i].x
          && mouseX <= grid[i].x + w
          && mouseY <= grid[i].y + w
          && mouseY >= grid[i].y) {
            if (grid[i].state == 'empty'){
              move(grid[i]);
              break;
            } else break;
        }
      }
    }
  }

  canvas.addEventListener('mousemove', mouse, false);
  canvas.addEventListener('click', mouse, false);
}
