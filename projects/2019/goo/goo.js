var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var num = 1000;
var sd = 50;
var sp = 50;
var min_d = 100;
var msX = w * 0.5;
var msY = h * 0.5;
var dots, _pt;
// var cols = ['#FFFCFE','#C4EAFF','#FFBDF7', '#D396FF', '#11d39c'];
var cols = ['#dd533c'];

var rndCol = function() {
  var len = cols.length;
  var hues = Math.floor(Math.random() * len);
  return cols[hues];
}

var Pt = function(x, y) {
  this.x = 0;
  this.y = 0;
}

var pop = function() {
  dots = []; var g;
  for (var i = 0; i < num; i++) {
    var _p = {
      x: (i % sd) * sp + 15,
      y: Math.floor(i / sd) * sp + 20,
      col: g, sc: 1.0
    };
    dots.push(_p);
    g = $.createRadialGradient(
      _p.x, _p.y, 5, _p.x,_p.y, 0);
    g.addColorStop(0,rndCol());
    g.addColorStop(.5, rndCol());
    g.addColorStop(1,'hsla(0,0%,0%, 1)');
  }
}

var sugar = function() {
  _pt.x += (msX - _pt.x) * 0.06;
  _pt.y += (msY - _pt.y) * 0.06;
  $.clearRect(0, 0, c.width, c.height);

  for (var i = 0; i < num; i++) {
    var _p = dots[i];
    var dx = _pt.x - _p.x;
    var dy = _pt.y - _p.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < min_d) {
      _p.sc = (min_d - dist) / 10 + 1.0;
    } else { _p.sc = 1.0;}
    $.fillStyle = _p.col;
    $.shadowColor = 'hsla(0,0%,0%,.8)';
    $.shadowBlur = 5;
    $.shadowOffsetX = 5;
    $.shadowOffsetY = 5;
    $.beginPath();
    $.arc(_p.x, _p.y, 5 * _p.sc, 0, Math.PI * 2, false);
    $.fill();
  }
}

var run = function() {
  window.requestAnimationFrame(run);
  sugar();
}

var anim = function() {
  pop();
  _pt = new Pt(0, 0);
  run();
}
anim();

document.addEventListener('mousemove', function(e) {
  var rect = e.target.getBoundingClientRect();
  msX = e.clientX - rect.left;
  msY = e.clientY - rect.top;
}, false);

document.addEventListener('touchmove', function(e) {
  var rect = e.target.getBoundingClientRect();
  e.preventDefault();
  msX = e.touches[0].clientX - rect.left;
  msY = e.touches[0].clientY - rect.top;
}, false);

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);


console.log('Coded With ❤ Always, @tmrDevelops');
