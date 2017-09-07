import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');

  const game = new Game(canvas, ctx);

  window.ctx = ctx;
  window.game = game;
  window.gameView = new GameView(game, ctx);

  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 39: //right
        game.fallingPew.move(1,0);
        break;
      case 37: //left
        game.fallingPew.move(-1,0);
        break;
      case 38: //up - switch colors
        game.fallingPew.switchColors();
        break;
      case 40: //down
        game.fallingPew.move(0, 1);
        break;
      case 32: //spacebar - rotate
        game.fallingPew.rotate();
        break;
      default:
        return;
    }
  });
});
