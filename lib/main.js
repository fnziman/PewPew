import Game from './game';

const SPEED = { hard: 100, medium: 200, easy: 500 };
const start = document.getElementById('start');
const replay = document.getElementById('replay');
const gameOver = document.getElementById('game-over');
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');
let game = new Game(canvas, ctx);

document.addEventListener('DOMContentLoaded', () => {
  initButtons();
});

const initButtons = () => {
  start.addEventListener('click', () => {
    startGame();
  });
  replay.addEventListener('click', () => {
    resetGame();
  });
  easy.addEventListener('click', () => {
    setSpeed(SPEED.easy);
  });
  medium.addEventListener('click', () => {
    setSpeed(SPEED.medium);
  });
  hard.addEventListener('click', () => {
    setSpeed(SPEED.hard);
  });
}

const setSpeed = (speed) => {
  game.board.speed = speed;
  resetSpeedButtons();
  switch (speed) {
    case SPEED.easy:
      easy.style.color = 'magenta';
      break;
    case SPEED.medium:
      medium.style.color = 'yellow';
      break;
    case SPEED.hard:
      hard.style.color = 'cyan';
      break;
    default:  
  }
}
const resetSpeedButtons = () => {
  easy.style.color = 'black';
  medium.style.color = 'black';
  hard.style.color = 'black';
}
const resetGame = () => {
  const curSpeed = game.board.speed;
  game.board.reset();
  game = new Game(canvas, ctx);
  gameOver.className = "hidden";
  score.textContent = `Score: 0`;
  game.playing = true;
  game.board.dropPew();
  setSpeed(curSpeed);
}
const startGame = () => {
  start.className = "hidden";
  game.playing = true;
  game.board.dropPew();
}
