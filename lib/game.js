import Board from './board';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(canvas, ctx);
  }

  something(grid) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[col].length; col++) {

      }
    }
  }
}

export default Game;
