const { gameBoard } = require("./gameboard");
const { ship } = require("./ship.js");

class player {
  name;
  points;
  shipCoordinates;
  ships;
  gameboard;

  constructor(name) {
    this.name = name;
    this.gameboard = new gameBoard(name);
    points = 0;
  }

  pointIncrementer() {
    points++;
  }

  placeShips(x, y, dir, len) {
    var ship = new ship(len, x, y, dir);
    this.ships.push(ship);
  }

  hitMissile(x, y, Board) {
    //hit missile on enemy gameboard.
    var result = Board.missileHit(x, y);
    return result;
  }
}
