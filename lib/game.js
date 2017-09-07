import Board from './board';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new Board(canvas, ctx);
  }

}

export default Game;
