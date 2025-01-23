import { gameBoard } from "./gameboard";

export class game {
  states = {
    INITIALIZING: "INITIALIZING",
    PLAYER_TURN: "PLAYER_TURN",
    COMPUTER_TURN: "COMPUTER_TURN",
    GAME_OVER: "GAME_OVER",
  };

  currentState;
  player1;
  computer;
  winner;

  constructor(name) {
    this.player1 = new gameBoard(name);
    this.computer = new gameBoard("computer");
    this.currentState = this.states.INITIALIZING;
    this.winner = null;
  }

  startGame() {
    if (this.currentState !== "INITIALIZING") return;
    this.generateComputerShipCoordinates();
    this.player1.initiateGame();
    this.computer.initiateGame();
    this.currentState = this.states.PLAYER_TURN;
  }

  generateComputerShipCoordinates() {
    var x = 1;
    for (let i = 1; i <= 4; i++) {
      var x = Math.floor(Math.random() * 7);
      var y = Math.floor(Math.random() * 7);
      var dir = Math.floor(Math.random() * 2);
      var result = this.computer.placeShips([x, y], i, dir);
      if (!(result === 1)) {
        i--;
        x--;
      }

      x++;
    }
    return x;
  }

  computerTurn() {
    if (this.currentState !== this.states.COMPUTER_TURN) return;
    var x = Math.floor(Math.random() * 7);
    var y = Math.floor(Math.random() * 7);
    var result = this.player1.missileHit(x, y);
    if (result === -1) {
      //blank but correct shot, next turn
      this.currentState = this.states.PLAYER_TURN;
    } else if (result === 1) {
      //incorrect shot, do again
      this.computerTurn();
    } else {
      if (result === 0) {
        //correct shot. Do agains
        this.computerTurn();
      } else if (result === 2) {
        //correct shot. Game Won
        this.endGame("computer");
      }
    }
  }

  humanTurn(x, y) {
    if (this.currentState !== this.states.PLAYER_TURN) return;

    var result = this.computer.missileHit(x, y);
    if (result === 0) {
      this.currentTurn = "computer";
      return 0;
      // this.computerTurn();
      //blank but correct shot, next turn
    } else {
      if (result === 2) {
        //correct shot. Game Won
        this.endGame("player1");
        return 2;
      }
    }
    return result;

    //returns 0-> if shot missed
    //returns 1->shot placed
    //returns -1 -> if incorrect shot
  }

  endGame(winner) {
    this.currentState = this.states.GAME_OVER;
    this.winner = winner;
    console.log(`${winner} wins the game!`);
  }
}
