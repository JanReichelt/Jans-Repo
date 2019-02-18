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
  const groups = [];  // Container für Steingruppen, die im Spiel aufkommen.
  const moves = [];   // Hier wird der Spielablauf gespeichert als geordnete Menge an grids. Anzahl der Züge ist moves.length-1.
  let cols, rows;     // Anzahl der Zeilen und Spalten, die der Spieler zu Beginn auswählt.
  let w;              // die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.
  let lastMove = 'w'; // Was war der letzte Zug? Nächster Zug in anderer Farbe. Spiel beginnt mit "s".

/// set classes
  class Intersection{
    constructor(i, j, state) {
      // i steht für die Spalte und j für die Zeile
      this.i = i;
      this.j = j;
      this.state = state; // 'empty', 'white', 'black'
      this.neighbors = {};
      this.group = {};
      this.x = this.i * w;
      this.y = this.j * w;
    }

    check_neighbors(){
      this.neighbors.top     = grid[index(this.i, this.j-1)];
      this.neighbors.right   = grid[index(this.i+1, this.j)];
      this.neighbors.bottom  = grid[index(this.i, this.j+1)];
      this.neighbors.left    = grid[index(this.i-1, this.j)];
      // console.log(this.neighbors);
    }

    check_group(){
      // eleganter lösen!!
      // if (this.neighbors.top.state
      // && this.neighbors.right.state
      // && this.neighbors.bottom.state
      // && this.neighbors.left.state == 'empty') {
      //   console.log(groups);
      //   groups.push(new Group(this));
      //   console.log(groups);
      //   console.log("neue Gruppe angelegt.");
      // } else {
      //   console.log("mindestens ein Nachbar ist besetzt.");
      // }

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

      if (liberties == (liberties + same_neighbors + diff_neighbors)
          || same_neighbors == 0) {
        groups.push(new Group(this));
        this.group = groups[groups.length-1];
        console.log("neue Gruppe erstellt");
        console.log(groups);
        console.log(this.group);
      } else if (same_neighbors >= 1) {
        for (let elem in this.neighbors) {
          if (this.neighbors[elem]) {
            if (this.neighbors[elem].state == this.state) {
              console.log("gruppen vereinen...");
              groups.push(new Group(this));
              this.group = groups[groups.length-1];
              this.group.members.push(this.neighbors[elem]);
              groups.splice(groups.indexOf(this.neighbors[elem].group));
              this.neighbors[elem].group = groups[groups.length-1];
            }
          }
        }
      }
// Aufpassen: Mit zwei Steinen funktioniert es - mit mehreren noch nicht!
// Der Grund könnte sein, dass die alte Gruppe entfernt wird

    }
      // if (this.state == this.neighbors.top.state) {
      //
      //   console.log("Zu Gruppe hinzufügen");
      // } else {
      //   console.log("fail");
      // }

      // for (let now in this.neighbors) {
      //
      //   if (this.neighbors.hasOwnProperty(now)) {
      //     console.log(this.neighbors);
      //     console.log(now);
      //     console.log(now.state);
      //     console.log(this.state);
      //     if (now.state == this.state) {
      //       console.log("Nachbar hat diesselbe Farbe.");
      //     } //else if (next.state != this.state && next.state != "empty") {
      //       //console.log("Nachbar hat andere Farbe.");
      //     //}
      //   }
      // }

    showIntersection(color) {
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
            grid[i].check_neighbors();
        }
      }

    showBoard() {
      for (let i = 0; i < cols*rows; i++) {
        if (grid[i] != undefined) {
          grid[i].showIntersection("black");
        }
      }
    }
  }

  class Group{
    constructor(intersection){
      this.members = []; // "Size" ist nicht mehr nötig, da members.length
      this.members.push(intersection);
      console.log("members:");
      console.log(this.members);
      let liberties = 0;  // Anzahl der Freiheiten einer Gruppe. Wird direkt beim setzen ermittelt. Beim setzen werden auch direkt die Freiheiten der angrenzenden Gruppen angepasst.
      let index;      // Index der Gruppe im Array groups. Identifier der Gruppe.
      let group_color;// Farbe der Gruppe.
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
    if (lastMove == 'w'){
      intersection.state = 'black';
      intersection.showIntersection("black");
      lastMove = 'b'
    } else if (lastMove == 'b'){
      intersection.state = 'white';
      intersection.showIntersection("black");
      lastMove = 'w';
    }
    intersection.check_group();
  }
/// Get it going

  var b = new Board(19 , 19); //Immer die größere Zahl zuerst!!
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
