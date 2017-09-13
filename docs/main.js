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

  const easy = document.getElementById('easy');
  const medium = document.getElementById('medium');
  const hard = document.getElementById('hard');
  easy.addEventListener('click', () => {
    game.board.speed = 500;
    if (game.board.fallingPew) {
      game.board.fallingPew.speed = 500;
    }
    easy.style.color = 'magenta';
    medium.style.color = 'black';
    hard.style.color = 'black';
  });
  medium.addEventListener('click', () => {
    game.board.speed = 200;
    if (game.board.fallingPew) {
      game.board.fallingPew.speed = 200;
    }
    medium.style.color = 'yellow';
    easy.style.color = 'black';
    hard.style.color = 'black';
  });
  hard.addEventListener('click', () => {
    game.board.speed = 50;
    if (game.board.fallingPew) {
      game.board.fallingPew.speed = 50;
    }
    hard.style.color = 'cyan';
    easy.style.color = 'black';
    medium.style.color = 'black';
  });

  //testing/////
  window.game = game;

});
