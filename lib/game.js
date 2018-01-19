import Board from './board';
import { setHighScore, getHighScore } from './firebase';
import { DOM_ELS } from './main';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(this, canvas, ctx);
    this.playing = false;
    this.score = 0;
    getHighScore().then((res) => {
      this.highScore = res;
      DOM_ELS.highScore.textContent = `High Score: ${res}`;
    });
    //Do I need to do something about this ^^^ ??
  }

  pause() {
    this.playing = !this.playing;
    DOM_ELS.paused.className = DOM_ELS.paused.className === "showing" ? "hidden" : "showing";
    if (this.playing) {
      this.board.fallingPew.callFall();
    }
  }

  resetCheckBoard() {
    for (let row = 0; row < this.board.checkBoard.length; row++) {
      for (let col = 0; col < this.board.checkBoard[row].length; col++) {
        this.board.checkBoard[row][col] = false;
      }
    }
  }

  searchAndDestroy(grid, checkBoard) {
    let clearPos = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== 0) {
          checkBoard[row][col] = true;
          let currentPos = [[row,col]];
          let toClear = this.search(grid, checkBoard, row, col, currentPos);
          if (toClear.length >= 4) {
            this.destroy(toClear);
            this.checkSettle();
            this.resetCheckBoard();
            this.searchAndDestroy(grid, checkBoard);
          } else {
            this.resetCheckBoard();
          }
        }
      }
    }
  }
  search(grid, checkBoard, row, col, clearPos) {
    let currentSpot = grid[row][col];
    if (col > 0 && grid[row][col - 1] === currentSpot && !checkBoard[row][col - 1]) {
      clearPos.push([row, col - 1]);
      checkBoard[row][col - 1] = true;
      this.search(grid, checkBoard, row, col -1, clearPos);
    }
    if (col < 9 && grid[row][col + 1] === currentSpot && !checkBoard[row][col + 1]) {
      clearPos.push([row, col + 1]);
      checkBoard[row][col + 1] = true;
      this.search(grid, checkBoard, row, col + 1, clearPos);
    }
    if (row > 0 && grid[row - 1][col] === currentSpot && !checkBoard[row - 1][col]) {
      clearPos.push([row - 1, col]);
      checkBoard[row - 1][col] = true;
      this.search(grid, checkBoard, row - 1, col, clearPos);
    }
    if (row < 14 && grid[row + 1][col] === currentSpot && !checkBoard[row + 1][col]) {
      clearPos.push([row + 1, col]);
      checkBoard[row + 1][col] = true;
      this.search(grid, checkBoard, row + 1, col, clearPos);
    }

    return clearPos;
  }
  destroy(toClear) {
    this.score += toClear.length * 100;
    const score = document.getElementById('score');
    score.textContent = `Score: ${this.score}`;
    if (this.score >= this.highScore) {
      const highScore = document.getElementById('high-score');
      setHighScore(this.score);
      this.highScore = this.score;
      highScore.textContent = `High Score: ${this.highScore}`;
    }
    toClear.forEach((pos) => {
      this.board.grid[pos[0]][pos[1]] = 0;
    });
  }
  checkSettle() {
    for (let row = 13; row >= 0; row--) {
      for (let col = 9; col >= 0; col--) {
        if (this.board.grid[row][col] !== 0 && this.board.grid[row + 1][col] === 0) {
          this.settle(row, col);
        }
      }
    }
  }
  settle(row, col) {
    while (row < 14 && this.board.grid[row + 1][col] === 0) {
      this.board.grid[row + 1][col] = this.board.grid[row][col];
      this.board.grid[row][col] = 0;
      row++;
    }
  }
}

export default Game;
