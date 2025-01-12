import { player } from "./player";
import { ship } from "./ship.js";

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

  shipSetUp(ship) {
    var x = ship.coordinates[0];
    var y = ship.coordinates[1];
    if (ship.dir === 0) {
      if (ship.coordinates[1] + ship.len < ship.columns) {
        var x = ship.coordinates[0];
        var y = ship.coordinates[1];
        for (let i = 0; i < ship.len; i++) {
          this.board[x][y] = ship.len;
          y++;
        }
      } else {
        //code to show error
      }
    } else {
      if (ship.coordinates[0] + ship.len < ship.columns) {
        for (let i = 0; i < ship.len; i++) {
          this.board[x][y] = ship.len;
          y++;
        }
      } else {
        //code to show error
      }
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
