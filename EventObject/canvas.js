var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;

var mouse = {
	x : innerWidth / 2,
	y : innerHeight / 2
}

var colorArray = [
	'#14080E',
	'#49475B',
	'#799496',
	'#ACC196',
	'#E9EB9E'
];

var gravity = 1;
var friction = 0.90;

// Event Listener
window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth-2;
	canvas.height = window.innerHeight-2;

	init();
});


addEventListener("click", function(){
	init();
});

/**Utility Functions **/
/**
 * Función que genera un código de RGB random, generada independiente al tutorial
 * @return {String} [Retorno de 7 caracteres]
 */
function randomColor(){
	return "#"+ Math.floor( Math.random() * 255 ) + ""+ Math.floor( Math.random() * 255 ) + ""+ Math.floor( Math.random() * 255 );
}

/**
 * Función propuesta por el tutorial para elegir un color de manera aleatoria, de un arreglo de opciones pre-definidas.
 * @return {String} [Retorno de 7 caracteres de una colección]
 */
function randomColorPalette(){
	return colorArray[Math.floor( Math.random()*colorArray.length )];
}

/**
 * Función para generar un entero random dentro de un rango.
 * @param  {int} min [Entero de N caracteres]
 * @param  {int} max [Entero de N caracteres]
 * @return {int}     [Retorno de entero de N caracteres]
 */
function randomIntFromRange(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}


function Ball(x, y, dx, dy, radius, color){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function(){
		if (this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy * friction;
		} else{
			this.dy += gravity;
		}

		if (this.x + this.radius +this. dx > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;

		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}



var ball;
var ballArray = [];

function init(){
	ballArray = [];
	for (var i = 0; i < 400; i++) {
		var radius = randomIntFromRange(8, 30);
		var x = randomIntFromRange(radius, canvas.width - radius);
		var y = randomIntFromRange(0, canvas.height - radius);
		var dx = randomIntFromRange(-2, 2);
		var dy = randomIntFromRange(-2, 2);
		var color = randomColorPalette();
		ballArray.push(new Ball(x, y, dx, dy, radius, color));
	}
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	};
}

init();
animate();