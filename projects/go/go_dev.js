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
  const groups = [];  // Container für alle Stein-Gruppen im Spiel.
  let cols, rows;     // Anzahl der Zeilen und Spalten, die der Spieler zu Beginn auswählt.
  let w;              // die Breite und Höhe der Intersections, die sich aus canvas.width/cols ergibt.
  let lastMove = 'w'; // Was war der letzte Zug? Nächster Zug in anderer Farbe. Spiel beginnt mit "s".

/// set classes
  class Intersection{
    constructor(i, j) {
      this.i = i;         // i steht für die Spalte und j für die Zeile
      this.j = j;
      this.state = 'empty'; // 'empty', 'white', 'black'
      this.neighbors = {};
      this.x = this.i * w;
      this.y = this.j * w;
      this.groupIndex;
    }

    setNeighbors(){
      // Erzeugt die Nachbarn einer Intersection und übergibt sie dem neighbors-Objekt.
      this.neighbors.top     = grid[index(this.i, this.j-1)];
      this.neighbors.right   = grid[index(this.i+1, this.j)];
      this.neighbors.bottom  = grid[index(this.i, this.j+1)];
      this.neighbors.left    = grid[index(this.i-1, this.j)];
    }

    showIntersection() {
      // Darstellung der einzelnen Intersections (Linien und Steine der richtigen Farbe).
      let wx = 0;
      let wy = 0
      const n = Object.entries(this.neighbors);

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

    setGroup(){
      // Führt alle Prüfungen aus, die zur Erstellung der Gruppe und der Gruppenmember nötig sind.
      // Erzeugt Gruppen und ermittelt die Member einer Gruppe.
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
      groups.push(new Group(this));
      this.groupIndex = groups.length - 1;
      getGroup(this).members.add(this);

      if (same_neighbors >= 1) {
        let sNGroup;
        for (let elem in this.neighbors) {
          if (this.neighbors[elem]) {
            if (this.neighbors[elem].state == this.state) {
              sNGroup = getGroup(this.neighbors[elem]);
              sNGroup.members.forEach(memb => getGroup(this).members.add(memb));
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
                dNGroup = getGroup(this.neighbors[elem]);
                li = dNGroup.getLiberties();
                console.log("nLibs: " + li);
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

  class Group{
    constructor(intersection){
      this.members = new Set();
      let groupIndex;     // Index der Gruppe im Groups-Array.
      this.liberties = 0;  // Anzahl der Freiheiten einer Gruppe. Wird direkt beim setzen ermittelt. Beim setzen werden auch direkt die Freiheiten der angrenzenden Gruppen angepasst.
      let groupColor;     // Farbe der Gruppe.
     }

     setIndex() {
       this.members.forEach(memb => {memb.groupIndex = groups.indexOf(this)});
     }

     getLiberties() {
       let lib = 0;
       const counted = [];

       this.members.forEach(memb => {
         const n = Object.entries(memb.neighbors);
         for (const [direction, neighbor] of n) {
           if (neighbor && neighbor.state == 'empty' && !(counted.includes(neighbor))){
             lib++;
             counted.push(neighbor);
           }
         }
       });
       this.liberties = lib;
       return lib;
     }

     takeGroup() {
       console.log(groups);
       groups.splice(groups.indexOf(this), 1);
       console.log(groups);
       this.members.forEach(memb => {
         memb.state = 'empty';
         console.log("memb.state: " + memb.state);
         c.clearRect(memb.x, memb.y, w, w);
         memb.showIntersection();
         memb.groupIndex = groups.indexOf(getGroup(memb));
         console.log("Index of group: " + memb.groupIndex);
       });


           // für jeden member:
           // 1. set state == 'empty'
           // 2. empty intersection darstellen
           // 3. this.groupIndex = undefined;

           // Für die Gruppe, die an die andere Gruppe anlag, jeweils eine Freiheit dazurechnen (aber nicht doppelt...)

           // 4. Gruppe aus groups löschen
           // für jede Gruppe in groups
           // 5. setIndex
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
      intersection.showIntersection();
      lastMove = 'b'
    } else if (lastMove == 'b'){
      intersection.state = 'white';
      intersection.showIntersection();
      lastMove = 'w';
    }

    intersection.setGroup();
    let l = getGroup(intersection).getLiberties();
    console.log('Libs: ' + l);


    const n = Object.entries(intersection.neighbors);
    for (const [direction, neighbor] of n) {
      if(neighbor && getGroup(neighbor)) {  // Nur, wenn der Nachbar eine Intersection ist (also nicht über Rand) und eine Gruppe hat (also nicht leer).
        console.log(neighbor);
        console.log(getGroup(neighbor).getLiberties());
        if(getGroup(neighbor).getLiberties() == 0) {
          getGroup(neighbor).takeGroup()
        }
      }
      if (l == 0) {
        console.log(getGroup(intersection));
        getGroup(intersection).takeGroup();
      }

    };

    // if l für Nachbargruppe == 0 --> Nachbargruppe.takeGroup()



    // console.log(getGroup(intersection));
    // console.log(getGroup(intersection).liberties);
    // if (getGroup(intersection).liberties == 0) {
    //
    //   groups.splice(groups.indexOf(intersection), 1);
    //   groups.forEach(group => {
    //     group.setIndex();
    //     group.showIntersection();
    //   });
    // }
  }

  function getGroup(intersection) {
    if (groups.length > 0) {
      return groups[intersection.groupIndex];
    } else {
      return null;
    }
  }

/// Get it going

  var b = new Board(9 , 9); //Immer die größere Zahl zuerst!!
  b.showBoard();

  function mouse(event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (let i = 0; i < cols*rows; i++) {
      if (mouseX >= grid[i].x
      && mouseX <= grid[i].x + w
      && mouseY <= grid[i].y + w
      && mouseY >= grid[i].y) {
        if (grid[i].state == 'empty'){
          move(grid[i]);
          break;
        }
      }
    }
  }

  canvas.addEventListener('click', mouse, false);
}
