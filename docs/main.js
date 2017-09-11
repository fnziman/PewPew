import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');

  let game = new Game(canvas, ctx);


  const start = document.getElementById('start');
  start.addEventListener('click', () => {
    start.className = "hidden";
    game.playing = true;
    game.board.dropPew();
  });
  const replay = document.getElementById('replay');
  const gameOver = document.getElementById('game-over');
  replay.addEventListener('click', () => {
    game.board.reset();
    game = new Game(canvas, ctx);
    gameOver.className = "hidden";
    game.playing = true;
    game.board.dropPew();
  });


  window.ctx = ctx;
  window.game = game;
});
