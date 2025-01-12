import { player } from "./player";

export class gameBoard {
  inProgress = 0;
  isOver = 0;
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
    if ((this.inProgress = 0)) {
      this.inProgress = 1;
    }
    var result = 0;
    if (this.board[x][y] === 0) this.board[x][y] = -1;
    else if (this.board[x][y] > 0) {
      //code to find out ship and call ship.onHit
      this.owner.ships[this.board[x][y]].onHit();
      this.board[x][y] = -1;
      result = 1;
      this.pointCounter();
    }
    return result;
  }

  shipSetUp(ship) {
    var x = ship.coordinates[0];
    var y = ship.coordinates[1];
    if (!this.inProgress) {
      if (ship.dir === 0) {
        if (y + ship.len < ship.columns) {
          for (let i = 0; i < ship.len; i++) {
            this.board[x][y] = ship.id;
            y++;
          }
        } else {
          //code to show error
        }
      } else {
        if (x + ship.len < ship.rows) {
          for (let i = 0; i < ship.len; i++) {
            this.board[x][y] = ship.id;
            y++;
          }
        } else {
          //code to show error
        }
      }
    }
  }

  pointCounter() {
    this.pointer--;
    if (pointer === 0) {
      isOver = 1;
    }
  }
}
