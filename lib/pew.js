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
    if (!this.board.gameOver) {
      setTimeout(this.fall.bind(this), 250);
    }
  }

  fall() {
    if (this.row1 < 14 && this.row2 < 14) {
      if (this.posFilled(this.row1 + 1, this.col1)) {
        this.noSwitch = true;
        this.singleFall(this.board.grid, 2, this.col2);
      } else if (this.posFilled(this.row2+1, this.col2)) {
        this.noSwitch = true;
        this.singleFall(this.board.grid, 1, this.col1);
      } else {
        this.moveDown(this.board.grid);
        this.callFall();
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
      grid[this.row2][this.col2 + 1] = grid[this.row2][this.col2];
      grid[this.row2][this.col2] = grid[this.row1][this.col1];
      grid[this.row1][this.col1] = 0;
      this.col1++;
      this.col2++;
      this.board.draw();
    }
  }
  moveLeft(grid) {
    if (this.col2 > 0 && this.col1 > 0
      && this.posEmpty(this.row1, this.col1 - 1)
      && !this.stopped && !this.noSwitch) {
      grid[this.row1][this.col1 - 1] = grid[this.row1][this.col1];
      grid[this.row2][this.col2 - 1] = grid[this.row2][this.col2];
      grid[this.row2][this.col2] = 0;
      this.col1--;
      this.col2--;
      this.board.draw();
    }
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

  posFilled(row, col) {
    return this.board.grid[row][col] !== 0;
  }
  posEmpty(row, col) {
    return this.board.grid[row][col] === 0;
  }
  // rotate() {
  //
  // }
}

export default Pew;
