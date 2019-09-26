import * as dat from 'dat.gui'

const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-2;
canvas.height = window.innerHeight-2;


ctx.beginPath();

ctx.moveTo(0, canvas.height / 2);

for (let i = 0; i < canvas.width; i++) {
	ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.01) * 100);
}

ctx.stroke();