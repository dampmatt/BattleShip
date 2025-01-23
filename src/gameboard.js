import { ship } from "./ship";

export class gameBoard {
  rows = 7;
  columns = 7;
  constructor(owner) {
    this.board = this.initializeGameboard();
    this.pointer = 10;
    this.points = 10;
    this.ships = [];
    this.owner = owner;
    this.inProgress = 0;
    this.isOver = 0;
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
    var result = -1;
    if (this.board[x][y] === 0) this.board[x][y] = -1;
    else if (this.board[x][y] > 0) {
      //code to find out ship and call ship.onHit
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
        currY--;
        this.board[currX][currY] = 0;
      }
    } else {
      while (currX != x) {
        currX--;
        this.board[currX][currY] = 0;
      }
    }
  }

  placeShips(lst, len, dir) {
    var id = this.ships.length + 1;
    var Ship = new ship(id, len, lst, dir);
    var result = this.shipSetUp(Ship);
    if (result == 1) this.ships.push(Ship);
    return result;

    //returns -1 if game already in progress
    //returns 0 if there is another ship in the path
    //returns 1 if ship successfully set
    // returns 2 if out of bounds
  }

  shipSetUp(ship) {
    const {
      coordinates: [x, y],
      size,
      dir,
      id,
    } = ship;

    let mainX = x,
      mainY = y;

    if (this.inProgress) return -1;

    const canPlaceShip =
      dir === 0
        ? y + size <= this.columns && y + size >= 0
        : x + size <= this.rows && x + size >= 0;
    if (!canPlaceShip) return 2;

    for (let i = 0; i < size; i++) {
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
    var result = -1;
    if (!this.inProgress) {
      if (ship.dir === 1) {
        for (let i = 0; i < ship.size; i++) {
          this.board[x][y] = 0;
          x++;
        }
      } else {
        for (let i = 0; i < ship.size; i++) {
          this.board[x][y] = 0;
          y++;
        }
      }
      ship.changeDir();
      result = this.shipSetUp(ship);
      if (result === 2 || result === 0) {
        ship.changeDir();
        this.shipSetUp(ship);
      }
    }
    return result;
  }

  pointCounter() {
    this.pointer--;
    if (this.pointer === 0) {
      return this.endGame();
    }
    return 0;
  }
}
