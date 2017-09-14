# Pew Pew

[Play Pew Pew!](https://fnziman.github.io/PewPew/)

![screenshot](./assets/images/pewpew.gif)

## Background

Pew Pew is a Tetris like falling block game in which the player tries to align four blocks of the same color to clear them off of the board.

## Technologies

1. JavaScript
1. IS DOM A TECHNOLOGY????????
2. HTML
3. Canvas
4. CSS
5. Firebase??????????????????????????????

## Implementation

In order to check each piece's surrounding pieces for a continuation of four or more pieces to be cleared off of the board a recursive search was implemented.
  1. ```clearPos``` is array of positions to be cleared
  2. ```checkBoard``` is a copy of the current playing board to check whether or not a position has already been checked

```javascript
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
  }```
