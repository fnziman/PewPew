import Game from './game';

const SPEED = { hard: 100, medium: 200, easy: 500 };
// const start = document.getElementById('start');
// const paused = document.getElementById('paused');
// const replay = document.getElementById('replay');
// const gameOver = document.getElementById('game-over');
// const finalScore = document.getElementById('final-score');
// const canvas = document.getElementById('board');
// const ctx = canvas.getContext('2d');
// const score = document.getElementById('score');
// const highScore = document.getElementById('high-score');
// const easy = document.getElementById('easy');
// const medium = document.getElementById('medium');
// const hard = document.getElementById('hard');
const start = $('#start');
const paused = $('#paused');
const replay = $('#replay');
const gameOver = $('#game-over');
const finalScore = $('#final-score');
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const score = $('#score');
const highScore = $('#high-score');
const easy = $('#easy');
const medium = $('#medium');
const hard = $('#hard');
export const DOM_ELS = {
  start, paused, replay, gameOver, finalScore, canvas, ctx, score,
  highScore, easy, medium, hard,
};
let game = new Game(canvas, ctx);

$().ready( () => {
  initButtons();
});

const initButtons = () => {
  start.click( () => {
    startGame();
  });
  replay.click( () => {
    resetGame();
  });
  easy.click( () => {
    setSpeed(SPEED.easy);
  });
  medium.click( () => {
    setSpeed(SPEED.medium);
  });
  hard.click( () => {
    setSpeed(SPEED.hard);
  });
};

const setSpeed = (speed) => {
  game.board.speed = speed;
  resetSpeedButtons();
  switch (speed) {
    case SPEED.easy:
      easy.css('color','magenta');
      break;
    case SPEED.medium:
      medium.css('color', 'yellow');
      break;
    case SPEED.hard:
      hard.css('color', 'cyan');
      break;
    default:
  }
};
const resetSpeedButtons = () => { //Do this in one line??
  easy.css('color', 'black');
  medium.css('color', 'black');
  hard.css('color', 'black');
};
const resetGame = () => {
  const curSpeed = game.board.speed;
  game.board.reset();
  game = new Game(canvas, ctx);
  gameOver.css('display', 'none');
  score.text(`Score: 0`);
  game.playing = true;
  game.board.dropPew();
  setSpeed(curSpeed);
};
const startGame = () => {
  start.css('display', 'none');
  game.playing = true;
  game.board.dropPew();
};
