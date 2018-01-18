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
      this.board.dropPew();
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

  // dropPew() {
  //   if (this.stopped) {
  //     this.board.dropPew();
  //   }
  // }

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

export default Pew;
