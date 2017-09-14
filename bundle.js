/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const newHighScore = (score, database) => {
  database.ref().set({ highScore: score });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = newHighScore;


const getScore = (database, game) => {
  database.ref().once('value').then((res) => {
    const highScore = res.val().highScore;
    game.highScore = highScore;
  });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getScore;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase__ = __webpack_require__(0);



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

  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](canvas, ctx, database);

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
    game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](canvas, ctx);
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase__ = __webpack_require__(0);



class Game {
  constructor(canvas, ctx, database) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](this, canvas, ctx);
    this.playing = false;
    this.database = database;
    this.score = 0;
    Object(__WEBPACK_IMPORTED_MODULE_1__firebase__["a" /* getScore */])(this.database, this);
  }

  pause() {
    this.playing = !this.playing;
    const paused = document.getElementById('paused');
    paused.className = paused.className === "showing" ? "hidden" : "showing";
    if (this.playing) {
      this.board.fallingPew.callFall();
    }
  }

  resetCheckBoard() {
    for (let row = 0; row < this.board.checkBoard.length; row++) {
      for (let col = 0; col < this.board.checkBoard[row].length; col++) {
        this.board.checkBoard[row][col] = false;
      }
    }
  }

  searchAndDestroy(grid, checkBoard) {
    let clearPos = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== 0) {
          checkBoard[row][col] = true;
          let currentPos = [[row,col]];
          let toClear = this.search(grid, checkBoard, row, col, currentPos);
          if (toClear.length >= 4) {
            this.destroy(toClear);
            this.checkSettle();
            this.resetCheckBoard();
            this.searchAndDestroy(grid, checkBoard);
          } else {
            this.resetCheckBoard();
          }
        }
      }
    }
  }
  search(grid, checkBoard, row, col, clearPos) {
    let currentSpot = grid[row][col];
    if (col > 0 && grid[row][col - 1] === currentSpot && !checkBoard[row][col - 1]) {
      clearPos.push([row, col - 1]);
      checkBoard[row][col - 1] = true;
      this.search(grid, checkBoard, row, col -1, clearPos);
    }
    if (col < 9 && grid[row][col + 1] === currentSpot && !checkBoard[row][col + 1]) {
      clearPos.push([row, col + 1]);
      checkBoard[row][col + 1] = true;
      this.search(grid, checkBoard, row, col + 1, clearPos);
    }
    if (row > 0 && grid[row - 1][col] === currentSpot && !checkBoard[row - 1][col]) {
      clearPos.push([row - 1, col]);
      checkBoard[row - 1][col] = true;
      this.search(grid, checkBoard, row - 1, col, clearPos);
    }
    if (row < 14 && grid[row + 1][col] === currentSpot && !checkBoard[row + 1][col]) {
      clearPos.push([row + 1, col]);
      checkBoard[row + 1][col] = true;
      this.search(grid, checkBoard, row + 1, col, clearPos);
    }

    return clearPos;
  }
  destroy(toClear) {
    this.score += toClear.length * 100;
    const score = document.getElementById('score');
    score.textContent = `Score: ${this.score}`;
    if (this.score >= this.highScore) {
      const highScore = document.getElementById('high-score');
      Object(__WEBPACK_IMPORTED_MODULE_1__firebase__["b" /* newHighScore */])(this.score, this.database);
      this.highScore = this.score;
      highScore.textContent = `High Score: ${this.highScore}`;
    }
    toClear.forEach((pos) => {
      this.board.grid[pos[0]][pos[1]] = 0;
    });
  }
  checkSettle() {
    for (let row = 13; row >= 0; row--) {
      for (let col = 9; col >= 0; col--) {
        if (this.board.grid[row][col] !== 0 && this.board.grid[row + 1][col] === 0) {
          this.settle(row, col);
        }
      }
    }
  }
  settle(row, col) {
    while (row < 14 && this.board.grid[row + 1][col] === 0) {
      this.board.grid[row + 1][col] = this.board.grid[row][col];
      this.board.grid[row][col] = 0;
      row++;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pew__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase__ = __webpack_require__(0);



class Board {
  constructor(game, canvas, ctx) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = new Array();
    this.checkBoard = new Array();
    this.COLORS = ['#00FFFF', '#A605FF', '#FF7400', '#FFFF00'];
    for (let x = 0; x < 15; x++) {
      this.grid[x] = new Array();
      this.checkBoard[x] = new Array();
      for (let y = 0; y < 10; y++) {
        this.grid[x][y] = 0;
        this.checkBoard[x][y] = false;
      }
    }
    this.pews = []; //can probably get rid of this.
    this.fallingPew = this.pews.slice(-1)[0];
    this.move = this.move.bind(this);
    this.gameOver = false;
    this.speed = 500;
  }

  reset() {
    this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);
  }
  over() {
    if (!this.grid[0].every(el => el === 0)) {
      this.gameOver = true;
      const gameOver = document.getElementById('game-over');
      const finalScore = document.getElementById('final-score');
      finalScore.textContent = `Score: ${this.game.score}`;
    }
  }
  setHighScore() {
    const highScore = document.getElementById('high-score');
    Object(__WEBPACK_IMPORTED_MODULE_1__firebase__["a" /* getScore */])(this.game.database, this.game);
    highScore.textContent = `High Score: ${this.game.highScore}`;
  }
  dropPew() {
    this.over();
    this.setHighScore();
    if (!this.gameOver) {
      this.game.searchAndDestroy(this.grid, this.checkBoard);
      document.addEventListener("keydown", this.move);
      this.createPew();
      this.fallingPew = this.pews.slice(-1)[0];
      this.fallingPew.callFall();
    }
  }
  createPew() {
    this.pews.push(new __WEBPACK_IMPORTED_MODULE_0__pew__["a" /* default */](this, this.speed));
  }

  draw() {
    this.reset();
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] !== 0) {
          this.ctx.beginPath();
          this.ctx.arc((((col + 1) * 30) - 15), (((row + 1) * 30) - 15), 15, 0, 2 * Math.PI);
          this.ctx.fillStyle = this.COLORS[this.grid[row][col] - 1];
          this.ctx.fill();
        }
      }
    }
  }
  move(e) {
    switch (e.keyCode) {
      case 39: //right
        this.fallingPew.moveRight(this.grid);
        break;
      case 37: //left
        this.fallingPew.moveLeft(this.grid);
        break;
      case 38: //up - switch colors
        this.fallingPew.switchColors(this.grid);
        break;
      case 40: //down
        this.fallingPew.moveDown(this.grid);
        break;
      case 32: //spacebar - rotate
        this.fallingPew.rotate(this.grid);
        break;
      case 13:
        this.game.pause();
        break;
      default:
        return;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Pew {
  constructor(board, speed) {
    this.board = board;
    this.row1 = 0;
    this.col1 = Math.floor(Math.random() * 9);
    this.row2 = 0;
    this.col2 = this.col1 + 1;
    this.board.grid[this.row1][this.col1] = Math.floor(Math.random() * 4) + 1;
    this.board.grid[this.row2][this.col2] = Math.floor(Math.random() * 4) + 1;
    this.stopped = false;
    this.noSwitch = false;
    this.horizontal = true;
    this.speed = speed;
  }

  posFilled(row, col) {
    return this.board.grid[row][col] !== 0;
  }
  posEmpty(row, col) {
    return this.board.grid[row][col] === 0;
  }

  callFall() {
    if (!this.board.gameOver && this.board.game.playing) {
      setTimeout(this.fall.bind(this), this.speed);
    }
  }

  fall() {
    if (this.row1 < 14 && this.row2 < 14) {
      if (this.horizontal) {
        //this.fallHorizontal(this.board.grid) {}
        if (this.posFilled(this.row1 + 1, this.col1)) {
          this.singleFall(this.board.grid, 2, this.col2);
        } else if (this.posFilled(this.row2 + 1, this.col2)) {
          this.singleFall(this.board.grid, 1, this.col1);
        } else {
          this.moveDown(this.board.grid);
          this.callFall();
        }
      } else {
        if (this.posEmpty(this.row2 + 1, this.col2)) {
          //this.fallVertical(this.board.grid) {}
          this.moveDownVertical(this.board.grid);
          this.callFall();
        } else {
          this.stopped = true;
        }
      }
    } else {
      this.stopped = true;
      this.noSwitch = true;
    }
    if (this.stopped) {
      this.dropPew();
    }
  }

  singleFall(grid, rowNum, col) {
    this.noSwitch = true;
    let row = this[`row${rowNum}`];
    if (this.posEmpty(row + 1, col) && row < 14) {
      grid[row + 1][col] = grid[row][col];
      grid[row][col] = 0;
      this[`row${rowNum}`]++;
      this.board.draw();
      this.callFall();
    } else {
      this.stopped = true;
    }
  }

  dropPew() {
    if (this.stopped) {
      this.board.dropPew();
    }
  }

  moveRight(grid) {
    if (this.col2 < 9 && this.col1 < 9
      && this.posEmpty(this.row2, this.col2 + 1)
      && !this.stopped && !this.noSwitch) {
        this.horizontal ? this.moveRightHorizontal(grid) : this.moveRightVertical(grid);

        grid[this.row1][this.col1] = 0;
        this.col1++;
        this.col2++;
        this.board.draw();
    }
  }
  moveRightHorizontal(grid) {
    grid[this.row2][this.col2 + 1] = grid[this.row2][this.col2];
    grid[this.row2][this.col2] = grid[this.row1][this.col1];
  }
  moveRightVertical(grid) {
    grid[this.row1][this.col1 + 1] = grid[this.row1][this.col1];
    grid[this.row2][this.col2 + 1] = grid[this.row2][this.col2];
    grid[this.row2][this.col2] = 0;
  }
  moveLeft(grid) {
    if (this.col2 > 0 && this.col1 > 0
      && this.posEmpty(this.row2, this.col1 - 1)
      && !this.stopped && !this.noSwitch) {
        this.horizontal ? this.moveLeftHorizontal(grid) : this.moveLeftVertical(grid);

        this.col1--;
        this.col2--;
        this.board.draw();
    }
  }
  moveLeftHorizontal(grid) {
    grid[this.row1][this.col1 - 1] = grid[this.row1][this.col1];
    grid[this.row2][this.col2 -1] = grid[this.row2][this.col2];
    grid[this.row2][this.col2] = 0;
  }
  moveLeftVertical(grid) {
    this.moveLeftHorizontal(grid);
    grid[this.row1][this.col1] = 0;
  }

  switchColors(grid) {
    if (!this.noSwitch) {
      let hold = grid[this.row1][this.col1];
      grid[this.row1][this.col1] = grid[this.row2][this.col2];
      grid[this.row2][this.col2] = hold;
      this.board.draw();
    }
  }
  moveDown(grid) {
    if (this.horizontal) {
      this.moveDownHorizontal(grid);
    } else {
      this.moveDownVertical(grid);
    }
  }
  moveDownHorizontal(grid) {
    if (this.posEmpty(this.row1 + 1, this.col1)
        && this.posEmpty(this.row2 + 1, this.col2)
        && this.row1 < 14 && this.row2 < 14) {
      grid[this.row1 + 1][this.col1] = grid[this.row1][this.col1];
      grid[this.row2 + 1][this.col2] = grid[this.row2][this.col2];
      grid[this.row1][this.col1] = 0;
      grid[this.row2][this.col2] = 0;
      this.row1++;
      this.row2++;
      this.board.draw();
    }
  }
  moveDownVertical(grid) {
    if (this.posEmpty(this.row2 + 1, this.col2)) {
      grid[this.row2 + 1][this.col2] = grid[this.row2][this.col2];
      grid[this.row1 + 1][this.col1] = grid[this.row1][this.col1];
      grid[this.row1][this.col1] = 0;
      this.row1++;
      this.row2++;
      this.board.draw();
    }
  }

  rotate(grid) {
    const dx = this.horizontal ? 1 : (-1);
    const dy = this.horizontal ? (-1) : 1;
    if (this.posEmpty(this.row2 + dx, this.col2 + dy) && !this.noSwitch) {
      grid[this.row2 + dx][this.col2 +dy] = grid[this.row2][this.col2];
      grid[this.row2][this.col2] = 0;
      this.row2 = this.row2 + dx;
      this.col2 = this.col2 + dy;
      this.board.draw();
      this.horizontal = !this.horizontal;
    } else {
      this.noSwitch = true;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Pew);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map