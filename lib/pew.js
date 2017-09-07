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
  }

  callFall() {
    setTimeout(this.fall.bind(this), 250);
  }

  fall() {
    if (this.row1 < 14 && this.row2 < 14) {
      if (this.board.grid[this.row1 + 1][this.col1] !== 0) {
        this.rightFall();
      } else if (this.board.grid[this.row2 + 1][this.col2] !== 0) {
        this.leftFall();
      } else {
        this.board.grid[this.row1 + 1][this.col1] = this.board.grid[this.row1][this.col1];
        this.board.grid[this.row2 + 1][this.col2] = this.board.grid[this.row2][this.col2];
        this.board.grid[this.row1][this.col1] = 0;
        this.board.grid[this.row2][this.col2] = 0;
        this.row1++;
        this.row2++;
        this.board.draw();
        this.callFall();
      }
    } else {
      this.stopped = true;
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

  move(x,y) {
    if (this.validMove(x,y)) {
      this.row1 += x;
      this.col1 += y;
      this.row2 += x;
      this.col2 += y;
    }
  }
  validMove(x,y) {
    if (
      this.row1 + x < 0 || this.row1 + x > 9 ||
      this.col1 + y < 0 || this.col1 + y > 14 ||
      this.row2 + x < 0 || this.row2 + x > 9 ||
      this.col2 + y < 0 || this.col2 + y > 14
    ) {
      return false;
    } else {
      return true;
    }
  }
  switchColors() {
    let hold = this.board.grid[this.row1][this.col1];
    this.board.grid[this.row1][this.col1] = this.board.grid[this.row2][this.col2];
    this.board.grid[this.row2][this.col2] = hold;
  }
}

export default Pew;
