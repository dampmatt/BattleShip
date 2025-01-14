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
    var result = this.gameboard.shipSetUp(ship);
    if (result) this.ships.push(ship);
    return result;
  }

  shipChangeDir(shipId) {
    ships[shipId].changeDir();
    board.changeDir(ships[shipId]);
  }
}
