import Pew from './pew';
import * as HighScore from './firebase';

class Board {
  constructor(game, canvas, ctx) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = new Array();
    this.checkBoard = new Array();
    this.COLORS = ['#00FFFF', '#A605FF', '#FF7400', '#FFFF00'];
    for (let x = 0; x < 15; x++) {
      this.grid[x] = new Array();
      this.checkBoard[x] = new Array();
      for (let y = 0; y < 10; y++) {
        this.grid[x][y] = 0;
        this.checkBoard[x][y] = false;
      }
    }
    this.pews = []; //can probably get rid of this.
    this.fallingPew = this.pews.slice(-1)[0];
    this.move = this.move.bind(this);
    this.gameOver = false;
    this.speed = 500;
  }

  reset() {
    this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);
  }
  over() {
    if (!this.grid[0].every(el => el === 0)) {
      this.gameOver = true;
      const gameOver = document.getElementById('game-over');
      const finalScore = document.getElementById('final-score');
      finalScore.textContent = `Score: ${this.game.score}`;
      gameOver.className = "showing";
      HighScore.getScore().then((res) => {
        const highScore = res;
        debugger
      });
      if (this.game.score) {
        document.getElementById('high-score').textContent = `High Score: ${highScore}`;
        HighScore.newHighScore(this.game.score);
      }
    }
  }

  dropPew() {
    this.over();
    if (!this.gameOver) {
      this.game.searchAndDestroy(this.grid, this.checkBoard);
      document.addEventListener("keydown", this.move);
      this.createPew();
      this.fallingPew = this.pews.slice(-1)[0];
      this.fallingPew.callFall();
    }
  }
  createPew() {
    this.pews.push(new Pew(this, this.speed));
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
  move(e) {
    switch (e.keyCode) {
      case 39: //right
        this.fallingPew.moveRight(this.grid);
        break;
      case 37: //left
        this.fallingPew.moveLeft(this.grid);
        break;
      case 38: //up - switch colors
        this.fallingPew.switchColors(this.grid);
        break;
      case 40: //down
        this.fallingPew.moveDown(this.grid);
        break;
      case 32: //spacebar - rotate
        this.fallingPew.rotate(this.grid);
        break;
      case 13:
        this.game.pause();
        break;
      default:
        return;
    }
  }

}

export default Board;
