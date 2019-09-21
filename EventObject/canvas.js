var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;

// Inicialización del puntero a mitad del screen para un mejor efecto visual.
var mouse = {
	x : canvas.width / 2,
	y : canvas.height / 2
}

const colors = [
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

//Reinicio de animación en cambios de resolución de pantalla.
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
 * @param  {Array} min  [Arreglo con colores definidos en la paleta]
 * @return {String} 	[Retorno de 7 caracteres de una colección]
 */
function randomColorPalette(colors){
	return colors[Math.floor( Math.random()*colors.length )];
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
 * Función para generar la distancia entre 2 puntos (x,y).
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
 * Define un sistema de ejes (referencias) variable para las particulas, permitiendo mantener el desplazamiento sobre un eje x y y con un giro, en vez de ángulos complejos para cada partícula. 
 * Extracción directa del repositorio de utilidades del curso.
 * @param  {[double]} velocity [Velocidad individual de la partícula]
 * @param  {[double]} angle    [Ángulo de colisión entre 2 objetos - en radianes]
 * @return {[double]}          [El sistema de velocidades X y Y después de la rotación del sistema]
 */
function rotate (velocity, angle) {
	const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
	return rotatedVelocities;
}


/**
 * Cambio de velocidades X y Y después de la colisión entre 2 partículas.
 * Extracción directa del repositorio de utilidades del curso.
 * @param  {[Particle]} particle      [Partícula con Coordinadas(X,Y) y Velocidad(X,Y)]
 * @param  {[Particle]} otherParticle [Partícula con Coordinadas(X,Y) y Velocidad(X,Y)]
 * @return {[Null] 					  [Sin Retorno]
 */
function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}



/**
 * Objeto -círculo- para la demostración de funcionalidad.
 * @param {int} x      	 [Coordenada X del origen del círculo]
 * @param {int} y      	 [Coordenada Y del origen del círculo]
 * @param {int} radius 	 [Dimensión del Radio del círculo]
 * @param {string} color [Color de relleno de la figura]
 */
function Particle(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.velocity = {
		x : 0.05,
		y : Math.random() - 0.5
	}

	this.radius = radius;
	this.color = color;
	this.radians = Math.random() * Math.PI * 2;
	this.distanceFromCenter = randomIntFromRange(50, 120);
	this.lastMouse = {
		x: x,
		y: y
	}

	this.update = function(){

		const lastPoint = {
			x : this.x,
			y : this.y
		};

		this.radians += this.velocity.x;

		//Efecto de arrastre, define una razón vectorial intermedia para una transición paulatina.
		this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
		this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

		//Efecto de rotación. Calculo de posiciones (x, y) para un incremento de grados constante por frame.
		this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
		this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
		this.draw(lastPoint);
	}

	//Transmisión de lasPoint para el "eco" visual de los trazos.
	this.draw = lastPoint => {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		var lineWidth = this.radius;
		ctx.moveTo(lastPoint.x, lastPoint.y);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
		ctx.closePath();
	}
}

let particles;



/**
 * Dibujado de N círculos que rotan alrededor de las coordenadas del mouse. Se define a la par la creación de líneas que afianzan el efecto visual de transición.
 * @return {[Null] [Sin retorno]
 */
function init(){
	particles = [];

	for (let i = 0; i < 50; i++) {
		const radius = (Math.random() * 2) + 1;
		const color = randomColorPalette(colors);

		particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, color));
	}
}


function animate(){
	requestAnimationFrame(animate);

	//Valores definibles dentro de fillStyle para representar un degradado progresivo. En movimiento, la misma opacidad hace que se pierda gradualmente; y en reposo, la sobre escritura mantiene el color visualmente sólido.
	//Revisar más a detalle que otras posibilidades se pueden generar con esta propiedad.
	ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	particles.forEach(particle => {
		particle.update(particles);
	 })
}

init();
animate();