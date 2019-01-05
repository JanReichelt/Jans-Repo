console.log("hi");

var gravity = 9;

var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var size = Math.floor(Math.random() * 80) + 25;

function Man(x, y, size) {
  //this.x = x; this.y = y;
  this.size = size;
  this.pos = new Vector(x, y);
  this.vel = new Vector(0, 0);
  this.acc = new Vector(0, 0);

  this.draw = function() {
    c.beginPath();
    c.lineWidth = "5";
    c.strokeStyle = "yellow";

    c.rect(this.pos.x, this.pos.y, this.size/2, this.size);
    c.stroke();
  }

  this.update = function() {
    this.pos =+ this.vel;
    this.vel =+ this.acc;


    this.draw();
  }
}

  var player = new Man(x, y, size);
  player.draw();
  console.log(player);

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
