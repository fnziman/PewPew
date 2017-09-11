import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');

  const game = new Game(canvas, ctx);

  const start = document.getElementById('start');
  start.addEventListener('click', () => {
    start.className = "hidden";
    game.playing = true;
    game.board.dropPew();
  });
  const score = document.getElementById('score');
  score.textContent = `Score: ${game.score}`;

  window.ctx = ctx;
  window.game = game;
});
