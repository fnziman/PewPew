class Pew {
  constructor(board, speed) {
    this.board = board;
    this.grid = board.grid;
    this.row = [0,0];
    const randomCol = Math.floor(Math.random() * 9);
    this.col = [randomCol, randomCol + 1];
    this.color = [ this.randomColor(), this.randomColor() ];
    this.stopped = false;
    this.noSwitch = false;
    this.horizontal = 0;
    this.speed = speed;
  }

  randomColor() {
    return Math.floor(Math.random() * 4) + 1;
  }
  posFilled(row, col) {
    return this.grid[row][col] !== 0;
  }
  posEmpty(row, col) {
    return this.grid[row][col] === 0;
  }
  reachedBottom() {
    return this.row[0] === 14 || this.row[1] === 14;
  }
  checkHorizontal() {
    return this.horizontal%4 === 0 || this.horizontal%4 === 2;
  }
  dropTo(col) {
    let row = 14;
    while (this.posFilled(row, col)) {
      row--;
    }
    return row;
  }
  finishMove() {
    this.grid[this.row[0]][this.col[0]] = this.color[0];
    this.grid[this.row[1]][this.col[1]] = this.color[1];
  }

  callFall() {
    if (!this.board.gameOver && this.board.game.playing) {
      setTimeout(this.fall.bind(this), this.speed);
    }
  }

  fall() {
    if (this.checkHorizontal()) {
      this.fallHorizontal();
    } else {
      this.fallVeritcal();
    }
    if (this.stopped) {
      this.finishMove();
      this.board.dropPew();
    } else {
      this.callFall();
    }
  }

  fallHorizontal() {
    const row = this.row;
    const col = this.col;
    if (this.reachedBottom()) {
      this.stopped = true;
      this.noSwitch = true;
    } else if (this.posFilled(row[0] + 1, col[0]) && this.posFilled(row[1] + 1, col[1])) { //next spot is filled for both pews
      this.stopped = true;
      this.noSwith = true;
    } else if (this.posFilled(row[0] + 1, col[0])) {
      this.noSwitch = true;
      this.singleFall(1);
    } else if (this.posFilled(row[1] + 1, col[1])) {
      this.noSwitch = true;
      this.singleFall(0);
    } else {
      this.move([1,1],[0,0]);
    }
  }

  fallVertical() {
    const row = this.row;
    const col = this.col;
    if (this.reachedBottom()) {
      this.stopped = true;
      this.noSwitch = true;
    } else if (this.posFilled(row[0] + 1, col[0]) || this.posFilled(row[1] + 1, col[1])) {
      this.stopped = true;
      this.noSwitch = true;
    } else {
      this.move([1,1],[0,0]);
    }
  }

  singleFall(idx) {
    this.row[idx] = this.dropTo(this.col[idx]);
    this.board.draw();
  }

  validMove(newRow, newCol) {
    return (this.within(newRow, newCol) && !this.noSwitch
      && this.posEmpty(newRow[0], newCol[0]) && this.posEmpty(newRow[1], newCol[1]));
  }

  within(newRow, newCol) {
    return (
      newRow[0] <= 14 && newRow[0] >= 0 && newRow[1] <= 14 && newRow[1] >= 0
      && newCol[0] >= 0 && newCol[0] <= 9 && newCol[0] >= 0 && newCol[0] <= 9
    );
  }

  move(rowChange = [0,0], colChange = [0,0]) {
    const newRow = [this.row[0] + rowChange[0], this.row[1] + rowChange[1]];
    const newCol = [this.col[0] + colChange[0], this.col[1] + colChange[1]];

    if (this.validMove(newRow, newCol)) {
      this.row = newRow;
      this.col = newCol;

      this.board.draw();
      return true;
    } else {
      return false;
    }
  }

  switchColors() {
    const swap = ([a,b]) => [b,a];
    if (!this.noSwitch) {
      this.color = swap(this.color);
      this.board.draw();
    }
  }

  rotate() {
    let i = 0;
    let rotated = false;
    let row = 0;
    let col = 0;
    const tryMove = () => {
      if (this.move([0, row], [0, col])) {
        rotated = true;
      }
    };
    while (!rotated) {
      switch ((this.horizontal + i) % 4) {
        case 0:
          row++;
          col--;
          tryMove();
          break;
        case 1:
          row--;
          col--;
          tryMove();
          break;
        case 2:
          row--;
          col++;
          tryMove();
          break;
        case 3:
          row++;
          col++;
          tryMove();
          break;
      }
      i++;
    }
    this.horizontal += i;
  }

}

export default Pew;
