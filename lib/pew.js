class Pew {
  constructor(board) {
    this.board = board;
    const randCol = Math.floor(Math.random() * 9); 
    //should ^^ "randCol" be in the body of class like "radColor" or in constructor??
    this.row = [0,0];
    this.col = [randCol, randCol + 1]; 
    this.color = [ this.randColor(), this.randColor() ];
    this.stopped = false;
    this.horizontal = 0;
  }
  //What is the best way to make all of this code dry?
  //Can I make some type of module for moves? 
  //Maybe another for checks?? 
  
  randColor() {
    return Math.floor(Math.random() * 4) + 1;
  }
  posFilled(row, col) {
    return this.board.grid[row][col] !== 0;
  }
  posEmpty(row, col) {
    return this.board.grid[row][col] === 0;
  }
  bothFilled() {
    const row = this.row;
    const col = this.col;
    return this.posFilled(row[0] + 1, col[0]) && this.posFilled(row[1] + 1, col[1]);
  }
  reachedBottom() {
    return this.row[0] === 14 || this.row[1] === 14;
  }
  checkHorizontal() {
    return (this.horizontal % 4) === 0 || (this.horizontal % 4) === 2;
  }
  dropTo(col) { 
    let row = 14;
    while (this.posFilled(row, col)) {
      row--;
    }
    return row;
  }
  //anyway to make this ^^^^ a shorter function?
  within(newRow, newCol) {
    return (
      newRow[0] <= 14 && newRow[0] >= 0 && newRow[1] <= 14 && newRow[1] >= 0
      && newCol[0] >= 0 && newCol[0] <= 9 && newCol[1] >= 0 && newCol[1] <= 9
    );
  }
  validMove(newRow, newCol) {
    return (
      this.within(newRow, newCol) && !this.stopped
      && this.posEmpty(newRow[0], newCol[0])
      && this.posEmpty(newRow[1], newCol[1])
    );
  }
  finishMove() {
    this.stopped = true;
    this.board.grid[this.row[0]][this.col[0]] = this.color[0];
    this.board.grid[this.row[1]][this.col[1]] = this.color[1];
    this.board.dropPew();
  }

  callFall() {
    if (!this.board.gameOver && this.board.game.playing) {
      setTimeout(this.fall.bind(this), this.board.speed);
    }
  }
  fall() {
    if (!this.move([1,1],[0,0])) {
      if (this.checkHorizontal()) {
        this.fallHorizontal();
      }
      this.finishMove();
    } else {
      this.callFall();
    }
  }
  fallHorizontal() {
    if (!this.reachedBottom() && !this.bothFilled()) {
      if (this.posFilled(this.row[0] + 1, this.col[0])) {
        this.singleFall(1);
      } else if (this.posFilled(this.row[1] + 1, this.col[1])) {
        this.singleFall(0);
      }
    }
  }
  singleFall(idx) {
    const result = [0,0];
    const dy = this.dropTo(this.col[idx]) - this.row[idx];
    result[idx] = dy;
    this.move(result, [0, 0]);
  }
  //what to do about this function ^^^ (do I like it?)

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
    if (!this.stopped) {
      this.color = swap(this.color);
      this.board.draw();
    }
  }
  //Can I make this ^^^ use the move function? 
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
  // Can this ^^ be smaller, it's huge!! 

}

export default Pew;
