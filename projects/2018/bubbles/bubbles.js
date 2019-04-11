var canvas = document.getElementById('bubbles');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";

var c = canvas.getContext('2d');
var circleCount = 600;
var minRadius = 12;
var maxRadius = 80;

var colorArray = [
	'#061324',
	'#3B658F',
	'#F28927',
	'#F27222',
	'#D9372B',
];

var geliColor = [
	'#FFA340',
	'#38001C',
	'#571133',
	'#017A74',
	'#00C2BA',
];

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
})

function Circle(x, y, velX, velY, r) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.r = r;
	this.color = geliColor[Math.floor(Math.random()*colorArray.length)];

	this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
			//c.arc(this.x, this.y, this.r, Math.PI*0.25, Math.PI * 1.75, false);
			//c.moveTo(this.x + (Math.cos(Math.PI/4)*this.r), this.y + (Math.sin(Math.PI/4)*this.r));
			//c.lineTo(this.x, this.y);
			//c.lineTo(this.x + (Math.cos(Math.PI*8.75/5)*this.r), this.y + (Math.sin(Math.PI*8.75/5)*this.r));
			//c.fillStyle = 'blue';
			c.fillStyle = this.color;
			c.fill();
			//c.arc(this.x, this.y, this.r, Math.PI*1.75, Math.PI*0.25, false);
			//c.fillStyle = 'white';
			//c.fill();
			//c.strokeStyle = 'teal';
			//c.stroke();
	}

	this.update = function() {
		if (this.x + this.r >= innerWidth || this.x - this.r <= 0) {
			this.velX *= -1;
		}
		if (this.y + this.r >= innerHeight || this.y - this.r <= 0) {
			this.velY *= -1
		}

	this.x += this.velX;
	this.y += this.velY;

	// Interactivity
	if (mouse.x - this.x < 50 && mouse.x - this.x > -50
		&& mouse.y - this.y < 50 && mouse.y - this.y > -50) {
		if (this.r <= maxRadius) {
			this.r += 1.5;
		}
		} else if (this.r >= minRadius){
		this.r -= 1.5;
		}
	this.draw();
	}
}

var circles = [];
for(var i = 0; i < circleCount; i++) {
	//var r = (Math.random() * 40);
	var r = minRadius;
	var x = (Math.random() * (window.innerWidth - (2 *r))) + r;
	var y = (Math.random() * (window.innerHeight - (2 * r))) + r;
	var velX = (Math.random() - 0.5) * 3;
	var velY = (Math.random() - 0.5) * 3;
	circles.push(new Circle(x, y, velX, velY, r));
}

//console.log(circles);
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for(var i = 0; i < circles.length; i++) {
		circles[i].update();
	}
}

animate();
