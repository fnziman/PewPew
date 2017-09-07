class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  play() {
    setInterval(this.game.board.draw() ,20);
  }
}

export default GameView;
