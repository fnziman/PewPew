import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');

  const game = new Game(canvas, ctx);

  window.ctx = ctx;
  window.game = game;
});
