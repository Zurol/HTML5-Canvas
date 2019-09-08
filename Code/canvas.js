var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;

var mouse = {
	x : undefined,
	y : undefined
}

var maxRadius = 40;

var colorArray = [
	'#14080E',
	'#49475B',
	'#799496',
	'#ACC196',
	'#E9EB9E'
];

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth-2;
	canvas.height = window.innerHeight-2;

	init();
});

function randomColor(){
	return "#"+ Math.floor( Math.random() * 255 ) + ""+ Math.floor( Math.random() * 255 ) + ""+ Math.floor( Math.random() * 255 );
}

function randomColorPalette(){
	return colorArray[Math.floor( Math.random()*colorArray.length )];
}

function Circle (x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = color;

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,  false);
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.stroke();
		ctx.fill();
	}

	this.update = function(){
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
		 mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
			if (this.radius < maxRadius){
				this.radius += 1;
			}
		} else if(this.radius > this.minRadius){
			this.radius -= 1;
		};

		this.draw();
	}
}

var circleArray = [];

function init(){

	circleArray = [];

	for (var i = 0; i < 400; i++) {
		var x  = Math.floor(Math.random() * (innerWidth  - radius * 2)) + radius;
		var y  = Math.floor(Math.random() * (innerHeight - radius * 2)) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		var radius = Math.floor( Math.random() * 3 + 1 );
		//var color = randomColor();
		var color = randomColorPalette();
		console.log(dx, dy);
		circleArray.push(new Circle(x, y, dx, dy, radius, color));
	}

	animate();
}


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	};
}


init();