class Pew {
  constructor(board) {
    this.board = board;
    this.row = 0;
    this.col = Math.floor(Math.random() * 10);
    this.board.grid[this.row][this.col] = Math.floor(Math.random() * 4) + 1;
  }

  fall() {
    let stopped = false;
    while (!stopped) {
      if (this.row < 14) {
        if (this.board.grid[this.row + 1][this.col] === 0) {
          this.board.grid[this.row + 1][this.col] = this.board.grid[this.row][this.col];
          this.board.grid[this.row][this.col] = 0;
          this.row++;
          this.board.renderBoard();
        } else {
          stopped = true;
        }
      } else {
        stopped = true;
      }
    }
  }
}

export default Pew;

// this.board.grid[this.row + 1][this.col + 1] = this.board.grid[this.row][this.col + 1];
// this.board.grid[this.row][this.col + 1] = 0;
