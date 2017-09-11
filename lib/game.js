import Board from './board';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(this, canvas, ctx);
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
