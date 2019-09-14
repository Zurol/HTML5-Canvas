var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;

var mouse = {
	x : 10,
	y : 10
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

/**
 * Función para generar la distancia entre 2 puntos (x,y)
 * @param  {float} x1 [Posicion del origen "X" del punto_1]
 * @param  {float} y1 [Posicion del origen "Y" del punto_1]
 * @param  {float} x2 [Posicion del origen "X" del punto_2]
 * @param  {float} y2 [Posicion del origen "Y" del punto_2]
 * @return {float}    [Distancia entre 2 puntos - Norma Vectorial]
 */
function getDistance(x1, y1, x2, y2){
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;

	return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) );
}


/**
 * Objeto -círculo- para la demostración de funcionalidad.
 * @param {int} x      	 [Coordenada X del origen del círculo]
 * @param {int} y      	 [Coordenada Y del origen del círculo]
 * @param {int} radius 	 [Dimensión del Radio del círculo]
 * @param {string} color [Color de relleno de la figura]
 */
function Circle(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.update = function(){
		this.draw();
	}

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
}

let circle1;
let circle2;

/**
 * Dibujado de 2 círculos para evaluar la distancia entre ambos.
 * @return {} [Sin retorno]
 */
function init(){
	circle1 = new Circle(300, 300, 100, 'black');
	circle2 = new Circle(undefined, undefined, 30, 'red');
}


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	circle1.update();
	circle2.x = mouse.x;
	circle2.y = mouse.y;
	circle2.update();

	if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
		circle1.color = 'red';
	} else{
		circle1.color = 'black';
	};

	console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y));
}

init();
animate();