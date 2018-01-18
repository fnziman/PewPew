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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var newHighScore = exports.newHighScore = function newHighScore(score, database) {
  database.ref().set({ highScore: score });
};

var getScore = exports.getScore = function getScore(database, game) {
  database.ref().once('value').then(function (res) {
    var highScore = res.val().highScore;
    game.highScore = highScore;
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

var _firebase = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('board');
  var ctx = canvas.getContext('2d');
  var scoreElement = document.getElementById('score');

  var config = {
    apiKey: "AIzaSyDqv9czEBfNMwWkeI_QGcC9O3IAgoKqoMQ",
    authDomain: "pew-pew-9bc05.firebaseapp.com",
    databaseURL: "https://pew-pew-9bc05.firebaseio.com",
    projectId: "pew-pew-9bc05",
    storageBucket: "",
    messagingSenderId: "194751512644"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var game = new _game2.default(canvas, ctx, database);

  var start = document.getElementById('start');
  start.addEventListener('click', function () {
    start.className = "hidden";
    game.playing = true;
    game.board.dropPew();
  });
  var replay = document.getElementById('replay');
  var gameOver = document.getElementById('game-over');
  replay.addEventListener('click', function () {
    game.board.reset();
    game = new _game2.default(canvas, ctx);
    gameOver.className = "hidden";
    game.playing = true;
    game.board.dropPew();
    easy.style.color = 'magenta';
    medium.style.color = 'black';
    hard.style.color = 'black';
    document.getElementById('score').textContent = 'Score: 0';
  });

  var easy = document.getElementById('easy');
  var medium = document.getElementById('medium');
  var hard = document.getElementById('hard');
  easy.addEventListener('click', function () {
    game.board.speed = 500;
    if (game.board.fallingPew) {
      game.board.fallingPew.speed = 500;
    }
    easy.style.color = 'magenta';
    medium.style.color = 'black';
    hard.style.color = 'black';
  });
  medium.addEventListener('click', function () {
    game.board.speed = 200;
    if (game.board.fallingPew) {
      game.board.fallingPew.speed = 200;
    }
    medium.style.color = 'yellow';
    easy.style.color = 'black';
    hard.style.color = 'black';
  });
  hard.addEventListener('click', function () {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(3);

var _board2 = _interopRequireDefault(_board);

var _firebase = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(canvas, ctx, database) {
    _classCallCheck(this, Game);

    this.canvas = canvas;
    this.ctx = ctx;
    this.board = new _board2.default(this, canvas, ctx);
    this.playing = false;
    this.database = database;
    this.score = 0;
    (0, _firebase.getScore)(this.database, this);
  }

  _createClass(Game, [{
    key: 'pause',
    value: function pause() {
      this.playing = !this.playing;
      var paused = document.getElementById('paused');
      paused.className = paused.className === "showing" ? "hidden" : "showing";
      if (this.playing) {
        this.board.fallingPew.callFall();
      }
    }
  }, {
    key: 'resetCheckBoard',
    value: function resetCheckBoard() {
      for (var row = 0; row < this.board.checkBoard.length; row++) {
        for (var col = 0; col < this.board.checkBoard[row].length; col++) {
          this.board.checkBoard[row][col] = false;
        }
      }
    }
  }, {
    key: 'searchAndDestroy',
    value: function searchAndDestroy(grid, checkBoard) {
      var clearPos = [];

      for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
          if (grid[row][col] !== 0) {
            checkBoard[row][col] = true;
            var currentPos = [[row, col]];
            var toClear = this.search(grid, checkBoard, row, col, currentPos);
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
  }, {
    key: 'search',
    value: function search(grid, checkBoard, row, col, clearPos) {
      var currentSpot = grid[row][col];
      if (col > 0 && grid[row][col - 1] === currentSpot && !checkBoard[row][col - 1]) {
        clearPos.push([row, col - 1]);
        checkBoard[row][col - 1] = true;
        this.search(grid, checkBoard, row, col - 1, clearPos);
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
  }, {
    key: 'destroy',
    value: function destroy(toClear) {
      var _this = this;

      this.score += toClear.length * 100;
      var score = document.getElementById('score');
      score.textContent = 'Score: ' + this.score;
      if (this.score >= this.highScore) {
        var highScore = document.getElementById('high-score');
        (0, _firebase.newHighScore)(this.score, this.database);
        this.highScore = this.score;
        highScore.textContent = 'High Score: ' + this.highScore;
      }
      toClear.forEach(function (pos) {
        _this.board.grid[pos[0]][pos[1]] = 0;
      });
    }
  }, {
    key: 'checkSettle',
    value: function checkSettle() {
      for (var row = 13; row >= 0; row--) {
        for (var col = 9; col >= 0; col--) {
          if (this.board.grid[row][col] !== 0 && this.board.grid[row + 1][col] === 0) {
            this.settle(row, col);
          }
        }
      }
    }
  }, {
    key: 'settle',
    value: function settle(row, col) {
      while (row < 14 && this.board.grid[row + 1][col] === 0) {
        this.board.grid[row + 1][col] = this.board.grid[row][col];
        this.board.grid[row][col] = 0;
        row++;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pew = __webpack_require__(4);

var _pew2 = _interopRequireDefault(_pew);

var _firebase = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(game, canvas, ctx) {
    _classCallCheck(this, Board);

    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = new Array();
    this.checkBoard = new Array();
    this.COLORS = ['#00FFFF', '#A605FF', '#FF7400', '#FFFF00'];
    for (var x = 0; x < 15; x++) {
      this.grid[x] = new Array();
      this.checkBoard[x] = new Array();
      for (var y = 0; y < 10; y++) {
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

  _createClass(Board, [{
    key: 'reset',
    value: function reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: 'over',
    value: function over() {
      if (!this.grid[0].every(function (el) {
        return el === 0;
      })) {
        this.gameOver = true;
        var gameOver = document.getElementById('game-over');
        var finalScore = document.getElementById('final-score');
        finalScore.textContent = 'Score: ' + this.game.score;
      }
    }
  }, {
    key: 'setHighScore',
    value: function setHighScore() {
      var highScore = document.getElementById('high-score');
      (0, _firebase.getScore)(this.game.database, this.game);
      highScore.textContent = 'High Score: ' + this.game.highScore;
    }
  }, {
    key: 'dropPew',
    value: function dropPew() {
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
  }, {
    key: 'createPew',
    value: function createPew() {
      this.pews.push(new _pew2.default(this, this.speed));
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.reset();
      for (var row = 0; row < this.grid.length; row++) {
        for (var col = 0; col < this.grid[row].length; col++) {
          if (this.grid[row][col] !== 0) {
            this.ctx.beginPath();
            this.ctx.arc((col + 1) * 30 - 15, (row + 1) * 30 - 15, 15, 0, 2 * Math.PI);
            this.ctx.fillStyle = this.COLORS[this.grid[row][col] - 1];
            this.ctx.fill();
          }
        }
      }
    }
  }, {
    key: 'move',
    value: function move(e) {
      switch (e.keyCode) {
        case 39:
          //right
          this.fallingPew.moveRight(this.grid);
          break;
        case 37:
          //left
          this.fallingPew.moveLeft(this.grid);
          break;
        case 38:
          //up - switch colors
          this.fallingPew.switchColors(this.grid);
          break;
        case 40:
          //down
          this.fallingPew.moveDown(this.grid);
          break;
        case 32:
          //spacebar - rotate
          this.fallingPew.rotate(this.grid);
          break;
        case 13:
          this.game.pause();
          break;
        default:
          return;
      }
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pew = function () {
  function Pew(board, speed) {
    _classCallCheck(this, Pew);

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

  _createClass(Pew, [{
    key: "posFilled",
    value: function posFilled(row, col) {
      return this.board.grid[row][col] !== 0;
    }
  }, {
    key: "posEmpty",
    value: function posEmpty(row, col) {
      return this.board.grid[row][col] === 0;
    }
  }, {
    key: "callFall",
    value: function callFall() {
      if (!this.board.gameOver && this.board.game.playing) {
        setTimeout(this.fall.bind(this), this.speed);
      }
    }
  }, {
    key: "fall",
    value: function fall() {
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
  }, {
    key: "singleFall",
    value: function singleFall(grid, rowNum, col) {
      this.noSwitch = true;
      var row = this["row" + rowNum];
      if (this.posEmpty(row + 1, col) && row < 14) {
        grid[row + 1][col] = grid[row][col];
        grid[row][col] = 0;
        this["row" + rowNum]++;
        this.board.draw();
        this.callFall();
      } else {
        this.stopped = true;
      }
    }
  }, {
    key: "dropPew",
    value: function dropPew() {
      if (this.stopped) {
        this.board.dropPew();
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight(grid) {
      if (this.col2 < 9 && this.col1 < 9 && this.posEmpty(this.row2, this.col2 + 1) && !this.stopped && !this.noSwitch) {
        this.horizontal ? this.moveRightHorizontal(grid) : this.moveRightVertical(grid);

        grid[this.row1][this.col1] = 0;
        this.col1++;
        this.col2++;
        this.board.draw();
      }
    }
  }, {
    key: "moveRightHorizontal",
    value: function moveRightHorizontal(grid) {
      grid[this.row2][this.col2 + 1] = grid[this.row2][this.col2];
      grid[this.row2][this.col2] = grid[this.row1][this.col1];
    }
  }, {
    key: "moveRightVertical",
    value: function moveRightVertical(grid) {
      grid[this.row1][this.col1 + 1] = grid[this.row1][this.col1];
      grid[this.row2][this.col2 + 1] = grid[this.row2][this.col2];
      grid[this.row2][this.col2] = 0;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(grid) {
      if (this.col2 > 0 && this.col1 > 0 && this.posEmpty(this.row2, this.col1 - 1) && !this.stopped && !this.noSwitch) {
        this.horizontal ? this.moveLeftHorizontal(grid) : this.moveLeftVertical(grid);

        this.col1--;
        this.col2--;
        this.board.draw();
      }
    }
  }, {
    key: "moveLeftHorizontal",
    value: function moveLeftHorizontal(grid) {
      grid[this.row1][this.col1 - 1] = grid[this.row1][this.col1];
      grid[this.row2][this.col2 - 1] = grid[this.row2][this.col2];
      grid[this.row2][this.col2] = 0;
    }
  }, {
    key: "moveLeftVertical",
    value: function moveLeftVertical(grid) {
      this.moveLeftHorizontal(grid);
      grid[this.row1][this.col1] = 0;
    }
  }, {
    key: "switchColors",
    value: function switchColors(grid) {
      if (!this.noSwitch) {
        var hold = grid[this.row1][this.col1];
        grid[this.row1][this.col1] = grid[this.row2][this.col2];
        grid[this.row2][this.col2] = hold;
        this.board.draw();
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown(grid) {
      if (this.horizontal) {
        this.moveDownHorizontal(grid);
      } else {
        this.moveDownVertical(grid);
      }
    }
  }, {
    key: "moveDownHorizontal",
    value: function moveDownHorizontal(grid) {
      if (this.posEmpty(this.row1 + 1, this.col1) && this.posEmpty(this.row2 + 1, this.col2) && this.row1 < 14 && this.row2 < 14) {
        grid[this.row1 + 1][this.col1] = grid[this.row1][this.col1];
        grid[this.row2 + 1][this.col2] = grid[this.row2][this.col2];
        grid[this.row1][this.col1] = 0;
        grid[this.row2][this.col2] = 0;
        this.row1++;
        this.row2++;
        this.board.draw();
      }
    }
  }, {
    key: "moveDownVertical",
    value: function moveDownVertical(grid) {
      if (this.posEmpty(this.row2 + 1, this.col2)) {
        grid[this.row2 + 1][this.col2] = grid[this.row2][this.col2];
        grid[this.row1 + 1][this.col1] = grid[this.row1][this.col1];
        grid[this.row1][this.col1] = 0;
        this.row1++;
        this.row2++;
        this.board.draw();
      }
    }
  }, {
    key: "rotate",
    value: function rotate(grid) {
      var dx = this.horizontal ? 1 : -1;
      var dy = this.horizontal ? -1 : 1;
      if (this.posEmpty(this.row2 + dx, this.col2 + dy) && !this.noSwitch) {
        grid[this.row2 + dx][this.col2 + dy] = grid[this.row2][this.col2];
        grid[this.row2][this.col2] = 0;
        this.row2 = this.row2 + dx;
        this.col2 = this.col2 + dy;
        this.board.draw();
        this.horizontal = !this.horizontal;
      } else {
        this.noSwitch = true;
      }
    }
  }]);

  return Pew;
}();

exports.default = Pew;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map