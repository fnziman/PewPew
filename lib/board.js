import Pew from './pew';

class Board {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = new Array();
    this.COLORS = ['#00FFFF', '#A605FF', '#FF7400', '#FFFF00'];
    for (let x = 0; x < 15; x++) {
      this.grid[x] = new Array();
      for (let y = 0; y < 10; y++) {
        this.grid[x][y] = 0;
      }
    }
    this.pews = [];
    this.fallingPew = this.pews.slice(-1)[0];
  }

  reset() {
    this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);
  }

  start() {
    while (this.pews.length === 0 || (this.fallingPew.stopped && this.fallingPew.row1 !== 0)) {
      if (this.pews.length === 0 || this.fallingPew.stopped) {
        this.createPew();
        this.fallingPew = this.pews.slice(-1)[0];
        this.fallingPew.fall();
      }
    }
  }
  createPew() {
    this.pews.push(new Pew(this));
  }

  draw() {
    this.reset();
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] !== 0) {
          this.ctx.beginPath();
          this.ctx.arc((((col + 1) * 30) - 15), (((row + 1) * 30) - 15), 15, 0, 2 * Math.PI);
          this.ctx.fillStyle = this.COLORS[this.grid[row][col] - 1];
          this.ctx.fill();
        }
      }
    }
  }
}

export default Board;
