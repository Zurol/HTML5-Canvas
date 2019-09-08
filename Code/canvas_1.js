var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
ctx.fillRect(100, 100, 100, 100);

ctx.fillStyle = "rgba(0, 255, 0, 0.1)";
ctx.fillRect(400, 100, 100, 100);

ctx.fillStyle = "rgba(0, 0, 255, 0.1)";
ctx.fillRect(300, 300, 100, 100);

console.log(canvas);

/**
 * New Line
 */

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400, 300);
ctx.strokeStyle = "#158989";
ctx.stroke();

/**
 * Arc / Circle
 */
/*
ctx.beginPath();
ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
ctx.strokeStyle = "#151478";
ctx.stroke(); */

for (var i = 0; i < 3; i++) {
	var x = Math.floor( Math.random() * innerWidth  );
	var y = Math.floor( Math.random() * innerHeight );
	var color = "#"+ Math.floor( Math.random() * 255 ) + ""+ Math.floor( Math.random() * 255 ) + ""+ Math.floor( Math.random() * 255 );
	ctx.beginPath();
	ctx.arc(x, y, 30, 0, Math.PI * 2, false);
	ctx.strokeStyle = color;
	ctx.stroke();
};