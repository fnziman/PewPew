import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');

  const game = new Game(canvas, ctx);
  game.board.dropPew();
  // document.addEventListener('onClick', () => {
  //   game.board.dropPew();
  // });

  window.ctx = ctx;
  window.game = game;
});
