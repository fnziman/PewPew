import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');

  const game = new Game(scoreElement, canvas, ctx);

  const start = document.getElementById('start');
  start.addEventListener('click', () => {
    start.className = "hidden";
    game.playing = true;
    game.board.dropPew();
  });


  window.ctx = ctx;
  window.game = game;
});
