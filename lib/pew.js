class Pew {
  constructor(board) {
    this.board = board;
    this.row1 = 0;
    this.col1 = Math.floor(Math.random() * 9);
    this.row2 = 0;
    this.col2 = this.col1 + 1;
    this.board.grid[this.row1][this.col1] = Math.floor(Math.random() * 4) + 1;
    this.board.grid[this.row2][this.col2] = Math.floor(Math.random() * 4) + 1;
    this.stopped = false;
    this.noSwitch = false;
  }

  callFall() {
    setTimeout(this.fall.bind(this), 250);
  }

  fall() {
    if (this.row1 < 14 && this.row2 < 14) {
      if (this.board.grid[this.row1 + 1][this.col1] !== 0) {
        this.noSwitch = true;
        this.rightFall();
      } else if (this.board.grid[this.row2 + 1][this.col2] !== 0) {
        this.noSwitch = true;
        this.leftFall();
      } else {
        this.moveDown();
        this.callFall();
      }
    } else {
      this.stopped = true;
      this.noSwitch = true;
      this.dropPew();
    }
  }

  leftFall() {
    if (this.board.grid[this.row1 + 1][this.col1] === 0 && this.row1 < 14) {
      this.board.grid[this.row1 + 1][this.col1] = this.board.grid[this.row1][this.col1];
      this.board.grid[this.row1][this.col1] = 0;
      this.row1++;
      this.board.draw();
      this.callFall();
    } else {
      this.stopped = true;
      this.dropPew();
    }
  }

  rightFall() {
    if (this.board.grid[this.row2 + 1][this.col2] === 0 && this.row2 < 14) {
      this.board.grid[this.row2 + 1][this.col2] = this.board.grid[this.row2][this.col2];
      this.board.grid[this.row2][this.col2] = 0;
      this.row2++;
      this.board.draw();
      this.callFall();
    } else {
      this.stopped = true;
      this.dropPew();
    }
  }

  dropPew() {
    if (this.stopped) {
      this.board.dropPew();
    }
  }
  moveRight() {
    if (this.col2 < 9 && this.col1 < 9
      && this.board.grid[this.row2][this.col2 + 1] === 0
      && !this.stopped && !this.noSwitch) {
      this.board.grid[this.row2][this.col2 + 1] = this.board.grid[this.row2][this.col2];
      this.board.grid[this.row2][this.col2] = this.board.grid[this.row1][this.col1];
      this.board.grid[this.row1][this.col1] = 0;
      this.col1++;
      this.col2++;
      this.board.draw();
    }
  }
  moveLeft() {
    if (this.col2 > 0 && this.col1 > 0
      && this.board.grid[this.row1][this.col1 -1] === 0
      && !this.stopped && !this.noSwitch) {
      this.board.grid[this.row1][this.col1 - 1] = this.board.grid[this.row1][this.col1];
      this.board.grid[this.row2][this.col2 - 1] = this.board.grid[this.row2][this.col2];
      this.board.grid[this.row2][this.col2] = 0;
      this.col1--;
      this.col2--;
      this.board.draw();
    }
  }
  switchColors() {
    if (!this.noSwitch) {
      let hold = this.board.grid[this.row1][this.col1];
      this.board.grid[this.row1][this.col1] = this.board.grid[this.row2][this.col2];
      this.board.grid[this.row2][this.col2] = hold;
      this.board.draw();
    }
  }
  moveDown() {
    if (this.board.grid[this.row1 + 1][this.col1] === 0
        && this.board.grid[this.row2 + 1][this.col2] === 0
        && this.row1 < 14 && this.row2 < 14) {
      this.board.grid[this.row1 + 1][this.col1] = this.board.grid[this.row1][this.col1];
      this.board.grid[this.row2 + 1][this.col2] = this.board.grid[this.row2][this.col2];
      this.board.grid[this.row1][this.col1] = 0;
      this.board.grid[this.row2][this.col2] = 0;
      this.row1++;
      this.row2++;
      this.board.draw();
    }
  }
  // rotate() {
  //
  // }
}

export default Pew;
