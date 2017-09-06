const COLORS = ['red', 'yellow', 'magenta', 'purple'];
const board = document.getElementById('board');
const ctx = board.getContext('2d');


let x1 = (Math.floor(Math.random() * (270)/30)*30) + 15;
let y1 = 15;
let x2 = x1 + 30;
let y2 = 15;
ctx.beginPath();
ctx.arc(x1, y1, 15 ,0 ,2 * Math.PI);
ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
ctx.fill();
ctx.beginPath();
ctx.arc(x2, y2, 15 ,0 ,2 * Math.PI);
ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
ctx.fill();
