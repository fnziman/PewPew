import Pew from './pew';
import { getHighScore } from './firebase';


class Board {
  constructor(game, canvas, ctx) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;

    this.fill();

    this.COLORS = ['#00FFFF', '#A605FF', '#FF7400', '#FFFF00'];
    this.fallingPew;
    this.move = this.move.bind(this);
    this.gameOver = false;
    this.speed = 500;
  }
  
  fill() {
    this.grid = new Array();
    this.checkBoard = new Array();
    //should these ^^ be in the constructor??
    
    for (let x = 0; x < 15; x++) {
      this.grid[x] = new Array();
      this.checkBoard[x] = new Array();
      for (let y = 0; y < 10; y++) {
        this.grid[x][y] = 0;
        this.checkBoard[x][y] = false;
      }
    }
  }
  reset() {
    this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);
  }
  
  checkGameOver() {
    if (!this.grid[0].every(el => el === 0)) {
      this.gameOver = true;
      const gameOver = document.getElementById('game-over');
      gameOver.className = 'showing';
      const finalScore = document.getElementById('final-score');
      finalScore.textContent = `Score: ${this.game.score}`;
    }
  }
  setHighScore() {
    const highScore = document.getElementById('high-score');
    getHighScore().then((res) => {
      this.game.highScore = res;
    });
  }
  
  dropPew() {
    this.checkGameOver();
    if (!this.gameOver) {
      this.game.searchAndDestroy(this.grid, this.checkBoard);
      document.addEventListener("keydown", this.move); //what is this line ??
      this.createPew();
      this.fallingPew.callFall();
    }
    this.setHighScore();
  }
  createPew() {
    this.fallingPew = new Pew(this);
  }
  
  draw() {
    this.reset();
    const pew = this.fallingPew;
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        let color = null;
        if (this.grid[row][col] !== 0) {
          color = this.grid[row][col];
        } else if (row === pew.row[0] && col === pew.col[0]) {
          color = pew.color[0];
        } else if (row === pew.row[1] && col === pew.col[1]) {
          color = pew.color[1];
        }
        if (color) {
          this.drawHelper(row, col, color);
        }
      }
    }
  }
  //Better way to write this ^^^^ func??
  drawHelper(row, col, color) {
    this.ctx.beginPath();
    this.ctx.arc((((col + 1) * 30) - 15), (((row + 1) * 30) - 15), 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.COLORS[color - 1];
    this.ctx.fill();
  }
  move(e) {
    switch (e.keyCode) {
      case 39: //right
        this.fallingPew.move([0,0],[1,1]);
        break;
      case 37: //left
        this.fallingPew.move([0,0],[-1,-1]);
        break;
      case 40: //down
        this.fallingPew.move([1,1], [0,0]);
        break;
      case 38: //up - switch colors
        this.fallingPew.switchColors();
        break;
      case 32: //spacebar - rotate
        this.fallingPew.rotate();
        break;
      case 13: // enter - pause
        this.game.pause();
        break;
      default:
        return;
    }
  }

}

export default Board;
