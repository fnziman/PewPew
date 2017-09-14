import Game from './game';
import { getScore } from './firebase';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');

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
    game = new Game(canvas, ctx);
    gameOver.className = "hidden";
    game.playing = true;
    game.board.dropPew();
    easy.style.color = 'magenta';
    medium.style.color = 'black';
    hard.style.color = 'black';
    document.getElementById('score').textContent = `Score: 0`;
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
    game.board.speed = 100;
    if (game.board.fallingPew) {
      game.board.fallingPew.speed = 100;
    }
    hard.style.color = 'cyan';
    easy.style.color = 'black';
    medium.style.color = 'black';
  });
});
