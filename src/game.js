import { gameBoard } from "./gameboard";

export class game {
  states = {
    INITIALIZING: "INITIALIZING",
    PLAYER_TURN: "PLAYER_TURN",
    COMPUTER_TURN: "COMPUTER_TURN",
    GAME_OVER: "GAME_OVER",
  };
  name;
  currentState;
  player1;
  computer;
  winner;

  constructor(name) {
    this.name = name;
    this.player1 = new gameBoard(name);
    this.computer = new gameBoard("computer");
    this.currentState = this.states.INITIALIZING;
    this.winner = null;
  }

  playerRandomize() {
    if (this.currentState !== "INITIALIZING") return 0;
    // console.log(123);
    this.player1 = new gameBoard(this.name);
    this.computer = new gameBoard("computer");
    this.placePlayerShipsRandomly();
    return 1;
  }

  startGame() {
    if (this.currentState !== "INITIALIZING") return;
    this.generateComputerShipCoordinates();
    // this.generatePlayerShipCoordinates();
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

  placePlayerShipsRandomly() {
    var z = 1;
    for (let i = 1; i <= 4; i++) {
      var x = Math.floor(Math.random() * 7);
      var y = Math.floor(Math.random() * 7);
      var dir = Math.floor(Math.random() * 2);
      var result = this.player1.placeShips([x, y], i, dir);
      if (!(result === 1)) {
        i--;
        z--;
      }
      z++;
    }
    return z;
  }

  computerTurn() {
    if (this.currentState !== this.states.COMPUTER_TURN) return;
    var x = Math.floor(Math.random() * 7);
    var y = Math.floor(Math.random() * 7);
    var id = this.player1.board[x][y];
    var result = this.player1.missileHit(x, y);
    if (result === 0) {
      //blank but correct shot, next turn
      this.currentState = this.states.PLAYER_TURN;
    } else if (result === -1) {
      //incorrect shot, do again
      var result = this.computerTurn();
      x = result[1];
      y = result[2];
      id = result[3];

      result = result[0];
    }
    if (result === 2) {
      //correct shot. Game Won
      this.endGame("computer");
    }
    return [result, x, y, id];
  }

  humanTurn(x, y) {
    if (this.currentState !== this.states.PLAYER_TURN) return -1;
    var id = this.computer.board[x][y];
    var result = this.computer.missileHit(x, y);
    if (result === 0) {
      this.currentState = this.states.COMPUTER_TURN;
      result = 0;
      // this.computerTurn();
      //blank but correct shot, next turn
    } else {
      if (result === 2) {
        //correct shot. Game Won
        this.endGame("player1");
      }
    }
    return [result, id];

    //returns 0-> if shot missed
    //returns 1->shot placed
    //returns -1 -> if incorrect shot\
    //returns 2->if game finish
  }

  endGame(winner) {
    this.currentState = this.states.GAME_OVER;
    this.winner = winner;
    console.log(`${winner} wins the game!`);
  }
}
