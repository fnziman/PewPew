import Game from './game';
import { getHighScore } from './firebase';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const score = document.getElementById('score');

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
    resetButtons();
    easy.style.color = 'magenta';
    score.textContent = `Score: 0`;
  });

  const easy = document.getElementById('easy');
  const medium = document.getElementById('medium');
  const hard = document.getElementById('hard');

  const resetButtons = () => {
    easy.style.color = 'black';
    medium.style.color = 'black';
    hard.style.color = 'black';
  };
  const setSpeed = (speed) => {
    game.board.speed = speed;
    if (game.board.fallingPew) {
      game.board.fallingPew.speed = speed;
    }
    resetButtons();
  };

  easy.addEventListener('click', () => {
    setSpeed(500);
    easy.style.color = 'magenta';
  });
  medium.addEventListener('click', () => {
    setSpeed(200);
    medium.style.color = 'yellow';
  });
  hard.addEventListener('click', () => {
    setSpeed(100);
    hard.style.color = 'cyan';
  });
});
