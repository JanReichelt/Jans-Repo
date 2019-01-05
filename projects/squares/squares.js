/*function displayDate() {
  document.getElementById("demo").innerHTML = Date();*/

///// CANVAS
var canvas = document.createElement('CANVAS');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.zIndex = -1;

var c = canvas.getContext('2d');

///// BOXEN

var mouse = {
	x: undefined,
	y: undefined,
	currX: undefined,
	currY: undefined,
}

var boxes = [];
var draw = false;

	window.addEventListener('mousedown', function(downEvent) {
		mouse.x = downEvent.clientX;
		mouse.y = downEvent.clientY;

		draw = true;

			window.addEventListener('mousemove', function(moveEvent) {

				mouse.currX = moveEvent.clientX;
				mouse.currY = moveEvent.clientY;
				for (var i = 0; i < boxes.length; i++) {
					console.log(boxes[i].touching(moveEvent.clientX, moveEvent.clientY));
				}
			});
	});

	window.addEventListener('mouseup', function(upEvent) {
		mouse.currX = upEvent.clientX;
		mouse.currY = upEvent.clientY;

		if (Math.abs(mouse.x-mouse.currX) > 1 && Math.abs(mouse.y-mouse.currY) > 1 ) {
		boxes.push(new Rectangle(mouse.x, mouse.y, mouse.currX, mouse.currY))}

		draw = false;

		console.log(boxes);
	});

function Rectangle(startX, startY, endX, endY) {
	this.startX = startX;
	this.startY = startY;
	this.widthX = endX - startX;
	this.widthY = endY - startY;

	this.drawRect = function() {
			c.beginPath();
			c.lineWidth = "3";
			c.strokeStyle = "green";
			c.rect(this.startX, this.startY, this.widthX, this.widthY);
			c.stroke();
		}

	this.touching = function(xTemp, yTemp) {
		if ((xTemp <= this.endX || xTemp >= this.startX) || (yTemp <= this.endY || yTemp >= this.startY)) {
			return true;
		} else {
			return false;
		}
	}

	}

///// PLAYER

	var gravity = 9;

	//var x = window.innerWidth / 2;
	//var y = window.innerHeight / 2;
	var pos = new Vector(window.innerWidth/2, window.innerHeight/2);
	var size = Math.floor(Math.random() * 80) + 25;

	function Man(pos, size) {
	  //this.x = x; this.y = y;
	  this.size = size;
	  this.pos = pos;
		this.vel = new Vector(0, 0);
	  this.acc = new Vector(0, 0.3);

		this.applyForce = function(force) {
			this.acc.x += force.x;
			this.acc.y += force.y;
		}

	  this.draw = function() {
	    c.beginPath();
	    c.lineWidth = "5";
	    c.strokeStyle = "orange";
	    c.rect(this.pos.x, this.pos.y, this.size/2, this.size);
	    c.stroke();
	  }

	  this.update = function() {
	    this.pos.plus(this.vel);
	    this.vel.plus(this.acc);

			if ((this.pos.x + (this.size/2)) >= window.innerWidth || (this.pos.x) <= 0) {
				this.vel.x *= -1;
			}
			if ((this.pos.y + this.size) >= window.innerHeight || this.pos.y <= 0) {
				this.vel.y *= -1;
			}
			if ((this.pos.y + this.size) >= window.innerHeight) {
				this.vel.mult(0);
			}

			// friction
			this.vel.mult(0.98);

			// Interactivity
			this.move = function() {
				window.addEventListener("keydown", function(keyEvent){
					console.log(keyEvent.key);
					if(keyEvent.code == KeyA) {
						this.vel.x = -5;
					};
				});
			}


	    this.draw();
	  }
	}

	  var player = new Man(pos, size);
	  console.log(player);

	function Vector(x, y) {
	  this.x = x;
	  this.y = y;

		this.toString = function() {
			console.log("x = " + this.x + ", y = " + this.y);
		}

		this.plus = function(op) {
			this.x = this.x + op.x;
			this.y = this.y + op.y;
		}

		this.mult = function(op) {
			this.x = this.x * op;
			this.y = this.y * op;
		}

		this.magn = function() {
			return (Math.sqrt((Math.pow(this.x, 2)) + (Math.pow(this.y, 2))));
		}

		this.norm = function() {
			var xTemp = this.x / this.magn();
			var yTemp = this.y / this.magn();
			this.x = xTemp;
			this.y = yTemp;
		}

		this.limit = function(op) {
			if (this.magn() > op) {
				this.norm();
				this.mult(op);
			}
		}

		this.setMag = function(op) {
			this.norm();
			this.mult(op);
		}
	}

console.log(player);

///// ANIMATION

	// Render forces
	var wind = new Vector(0.0, 0.0);
	var gravity = new Vector(0, 0.3);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	// Render boxes
	for(var i = 0; i < boxes.length; i++) {
		boxes[i].drawRect();
	}

	if (draw) {
		c.beginPath();
		c.lineWidth = "3";
		c.strokeStyle = "green";
		c.rect(mouse.x, mouse.y, mouse.currX - mouse.x, mouse.currY - mouse.y);
		c.stroke();
	}

	// Render Player
	player.update();
	player.move();
	player.acc.mult(0); // prevent accumulation of acc of multiple frames
	player.applyForce(wind);
	player.applyForce(gravity);

}

animate();
