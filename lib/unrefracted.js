
const COLORS = ['#00FFFF', '#A605FF', '#FF7400', '#FFFF00'];
const speed = 200; //will add speed options to manage difficulty later

const board = document.getElementById('board');
const ctx = board.getContext('2d');
const grid = new Array();
const color = COLORS[Math.floor(Math.random() * COLORS.length)];

const fillGrid = () => {
  for (let row = 0; row < 15; row++) {
    grid[row] = new Array();
    for (let col = 0; col < 10; col++) {
      grid[row][col] = 0;
    }
  }
};

const reset = () => {
  ctx.clearRect(0, 0, board.width, board.height);
};

const createPew = () => {
  let row = 0;
  let col = Math.floor(Math.random() * 10);
  grid[row][col] = 1;
  fall(row, col);
};

const fall = (row, col) => {
  while (row <= 15) {
    draw((((row + 1) * 30) - 15), ((col + 1) * 30) - 15);
    grid[row + 1][col] = grid[row][col];
    grid[row][col] = 0;
    row++;
  }
};


const draw = (row, col) => {
  ctx.clearRect(0, 0, board.width, board.height);
  ctx.beginPath();
  ctx.arc(col, row, 15 ,0 ,2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

// setInterval(fall, speed);



// const COLORS = ['#00FFFF', '#A605FF', '#FF7400', '#FFFF00'];
//
// const board = document.getElementById('board');
// const ctx = board.getContext('2d');
//
// const speed = 200; //will add speed options to manage difficulty later
//
//
// while (true) {
//   let x1 = (Math.floor(Math.random() * (270)/30)*30) + 15;
//   let y = 15;
//   let x2 = x1 + 30;
//   const color1 = COLORS[Math.floor(Math.random() * COLORS.length)];
//   const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
//
//   const fall = setInterval(function(){
//     ctx.clearRect(0, 0, board.width, board.height);
//     ctx.beginPath();
//     ctx.arc(x1, y, 15 ,0 ,2 * Math.PI);
//     ctx.fillStyle = color1;
//     ctx.fill();
//     ctx.beginPath();
//     ctx.arc(x2, y, 15 ,0 ,2 * Math.PI);
//     ctx.fillStyle = color2;
//     ctx.fill();
//     y += 30;
//     if (y === 465) {
//       ctx.save()
//       y = 15;
//       return;
//     }
//   }, speed);
//   fall();
// }
