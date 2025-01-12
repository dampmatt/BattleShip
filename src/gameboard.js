export class gameBoard {
  rows = 7;
  columns = 7;
  owner;
  points = 10;
  constructor(owner) {
    this.owner = owner;
    this.board = this.initializeGameboard();
    this.pointer = 10;
  }

  initializeGameboard() {
    return Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
  }

  missileHit(x, y) {
    if (this.board[x][y] === 0) this.board[x][y] = -1;
    else if (this.board[x][y] > 0) {
      //code to find out ship and call ship.onHit
      this.board[x][y] = -1;
    } else {
      //ask player to repeat coordinate set up
    }
  }

  shipSetUp(x, y, dir) {
    if (dir === 0) {
      //horizontal
      if (/*x-coordinate < rows-ship.len*/ 1)
        //plce ship horizontally
        x = 1;
      else {
        //place ship vertically
        y = 1;
      }
    } else {
      // do this vertically
    }
  }

  pointCounter() {
    if (playerHit) {
      this.pointer--;
      if (pointer === 0) {
        //restart
      }
    }
  }
}
