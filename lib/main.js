import Game from './game';
import { getHighScore } from './firebase';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const score = document.getElementById('score');

  var config = {
    apiKey: "AIzaSyDqv9czEBfNMwWkeI_QGcC9O3IAgoKqoMQ",
    authDomain: "pew-pew-9bc05.firebaseapp.com",
    databaseURL: "https://pew-pew-9bc05.firebaseio.com",
    projectId: "pew-pew-9bc05",
    storageBucket: "",
    messagingSenderId: "194751512644"
  };
  
  firebase.initializeApp(config);
  const database = firebase.database();

  let game = new Game(canvas, ctx, database);

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
    game = new Game(canvas, ctx, database);
    gameOver.className = "hidden";
    game.playing = true;
    // TODO: get highscore here
    game.board.dropPew();
    easy.style.color = 'magenta';
    medium.style.color = 'black';
    hard.style.color = 'black';
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
