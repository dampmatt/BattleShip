import { ship } from "./ship";

export class gameBoard {
  constructor(owner) {
    this.board = this.initializeGameboard();
    this.pointer = 10;
    this.points = 10;
    this.ships = [];
    this.owner = owner;
    this.inProgress = 0;
    this.isOver = 0;
    this.rows = 7;
    this.columns = 7;
  }

  initializeGameboard() {
    return Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
  }

  initiateGame() {
    this.inProgress = 1;
  }
  endGame() {
    return 2;
  }

  missileHit(x, y) {
    if (!this.inProgress) {
      this.initiateGame();
    }
    var result = 0;
    if (this.board[x][y] === 0) this.board[x][y] = -1;
    else if (this.board[x][y] > 0) {
      //code to find out ship and call ship.onHit
      this.ships[this.board[x][y]].onHit();
      this.board[x][y] = -1;
      result = this.pointCounter();
    } else {
      result = 1;
    }
    return result;
  }

  revertChanges(x, y, currX, currY, dir) {
    if (dir === 0) {
      while (currY != y) {
        this.board[currX][currY] = 0;
        currY--;
      }
    } else {
      while (currX != x) {
        this.board[currX][currY] = 0;
        currX--;
      }
    }
  }

  placeShips(lst, len, dir) {
    var id = this.ships.length || 0;
    var Ship = new ship(id, len, lst, dir);
    var result = this.board.shipSetUp(Ship);
    if (result) this.ships.push(Ship);
    return result;
  }

  shipSetUp(ship) {
    const {
      coordinates: [x, y],
      len,
      dir,
      id,
    } = ship;
    let mainX = x,
      mainY = y;

    if (this.inProgress) return -1;

    const canPlaceShip =
      dir === 0 ? y + len <= this.columns : x + len <= this.rows;

    if (!canPlaceShip) return 0;

    for (let i = 0; i < len; i++) {
      if (this.board[mainX][mainY] !== 0) {
        this.revertChanges(x, y, mainX, mainY, dir);
        return 0;
      }
      this.board[mainX][mainY] = id;
      if (dir === 0) mainY++;
      else mainX++;
    }
    return 1;
  }

  shipDirChange(ship) {
    var x = ship.coordinates[0];
    var y = ship.coordinates[1];
    if (!this.inProgress) {
      if (ship.dir === 1) {
        for (let i = 0; i < ship.len; i++) {
          this.board[x][y] = 0;
          y++;
        }
      } else {
        for (let i = 0; i < ship.len; i++) {
          this.board[x][y] = 0;
          y++;
        }
      }
      this.shipSetUp(ship);
    }
  }

  pointCounter() {
    this.pointer--;
    if (this.pointer === 0) {
      return this.endGame();
    }
    return 0;
  }
}
