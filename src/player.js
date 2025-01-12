const { gameBoard } = require("./gameboard");
import { ship } from "./ship";

export class player {
  name;
  points;
  shipCoordinates;
  ships;
  gameboard;
  coordinates;

  constructor(name) {
    this.name = name;
    this.gameboard = new gameBoard(name);
    points = 0;
  }

  pointIncrementer() {
    points++;
  }

  placeShips(lst, len, dir) {
    var id = this.ships.length || 0;
    var ship = new ship(id, len, lst, dir);
    this.ships.push(ship);
    this.gameboard.shipSetUp(ship);
  }

  hitMissile(x, y, Board) {
    //hit missile on enemy gameboard.
    var result = Board.missileHit(x, y);
    return result;
  }

  shipChangeDir(shipId) {
    ships[shipId].changeDir;
  }

  startGame() {
    this.gameboard.inProgress = 1;
  }
}
