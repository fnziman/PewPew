import Board from './board';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(canvas, ctx);
  }

  something(grid) {
    let clearPos = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (this.search(grid, row, col, clearPos).length >= 4) {
          debugger
        }
      }
    }
  }
  search(grid, row, col, clearPos) {
    debugger
    let currentSpot = grid[row][col];
    if (col > 0 && grid[row][col - 1] === currentSpot) {
      clearPos.push([row, col - 1]);
      this.search(grid, row, col -1, clearPos);
    } else if (col < 9 && grid[row][col + 1] === currentSpot) {
      clearPos.push([row, col +1]);
      this.search(grid, row, col + 1, clearPos);
    } else if (row > 0 && grid[row - 1][col] === currentSpot) {
      clearPos.push([row - 1, col]);
      this.search(grid, row - 1, col, clearPos);
    } else if (row < 9 && grid[row + 1][col] === currentSpot) {
      clearPos.push([row + 1, col]);
      this.search(grid, row + 1, col, clearPos);
    } else {
      return clearPos;
    }



  }
}

export default Game;
