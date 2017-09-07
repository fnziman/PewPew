class Pew {
  constructor(board) {
    this.board = board;
    this.row1 = 0;
    this.col1 = Math.floor(Math.random() * 9);
    this.row2 = 0;
    this.col2 = this.col1 + 1;
    this.board.grid[this.row1][this.col1] = Math.floor(Math.random() * 4) + 1;
    this.board.grid[this.row2][this.col2] = Math.floor(Math.random() * 4) + 1;
  }

  fall() {
    let stopped = false;

    while (!stopped) {
      if (this.row1 < 14 && this.row2 < 14) {
        if (this.board.grid[this.row1 + 1][this.col1] !== 0) {
          stopped = this.rightFall();
        } else if (this.board.grid[this.row2 + 1][this.col2] !== 0) {
          stopped = this.leftFall();
        } else {
          this.board.grid[this.row1 + 1][this.col1] = this.board.grid[this.row1][this.col1];
          this.board.grid[this.row2 + 1][this.col2] = this.board.grid[this.row2][this.col2];
          this.board.grid[this.row1][this.col1] = 0;
          this.board.grid[this.row2][this.col2] = 0;
          this.row1++;
          this.row2++;
          this.board.draw();
        }
      } else {
        stopped = true;
      }
    }
  }

  leftFall() {
    if (this.board.grid[this.row1 + 1][this.col1] === 0 && this.row1 < 14) {
      this.board.grid[this.row1 + 1][this.col1] = this.board.grid[this.row1][this.col1];
      this.board.grid[this.row1][this.col1] = 0;
      this.row1++;
      this.board.draw();
    } else {
      return true;
    }
  }

  rightFall() {
    if (this.board.grid[this.row2 + 1][this.col2] === 0 && this.row2 < 14) {
      this.board.grid[this.row2 + 1][this.col2] = this.board.grid[this.row2][this.col2];
      this.board.grid[this.row2][this.col2] = 0;
      this.row2++;
      this.board.draw();
    } else {
      return true;
    }
  }
}

export default Pew;
