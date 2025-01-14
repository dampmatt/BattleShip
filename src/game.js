import { gameBoard } from "./gameboard";
import { player } from "./player";
import { ship } from "./ship";

class game {
  player1;
  computer;
  inProgress = 0;
  iSfinished = 0;
  currentTurn;
  winner = "";

  constructor(name) {
    this.player1 = new player(name);
    this.computer = new player("computer");
    this.currentTurn = "player1";
  }

  generateComputerShipCoordinates() {
    //code to generate random coordinates,directions and length for computer
    for (let i = 1; i <= 4; i++) {
      var x = Math.floor(Math.random() * 7);
      var y = Math.floor(Math.random() * 7);
      var dir = Math.floor(Math.random() * 2);
      var result = this.computer.placeShips([x, y], i, dir);
      if (!result) i--;
    }
  }

  computerTurn() {
    var x = Math.floor(Math.random() * 7);
    var y = Math.floor(Math.random() * 7);
    var result = this.player1.gameboard.missileHit(x, y);
    if (result === -1) {
      //blank but correct shot, next turn
      this.currentTurn = "player1";
    } else if (result === 1) {
      //incorrect shot, do again
      this.computerTurn();
    } else {
      if (result === 0) {
        //correct shot. Do agains
      } else if (result === 2) {
        //correct shot. Game Won
        this.endGame();
      } else {
        //error
      }
    }
  }

  humanTurn(x, y) {
    if ((this.currentTurn = "player1")) {
      var result = this.computer.gameboard.hitMissile(x, y);
      if (result === -1) {
        this.currentTurn = "computer";
        this.computerTurn();
        //blank but correct shot, next turn
      } else if (result === 1) {
        //incorrect shot, do again
      } else {
        if (result === 0) {
          //correct shot. Do agains
        } else if (result === 2) {
          //correct shot. Game Won
          this.endGame();
        } else {
          //error
        }
      }
    }
  }

  gameStarted() {
    this.inProgress = 1;
    this.player1.gameboard.initiateGame();
    this.computer.gameboard.initiateGame();
  }
  endGame() {
    this.iSfinished = 1;
    this.winner = "computer";
  }
}
