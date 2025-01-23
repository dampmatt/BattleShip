import { game } from "../game";

describe("Game Class Tests", () => {
  let testGame;

  beforeEach(() => {
    testGame = new game("player");
  });

  test("Initial state should be INITIALIZING", () => {
    expect(testGame.currentState).toBe(testGame.states.INITIALIZING);
    expect(testGame.winner).toBeNull();
  });

  test("Game should transition to PLAYER_TURN after startGame", () => {
    testGame.startGame();
    expect(testGame.currentState).toBe(testGame.states.PLAYER_TURN);
    expect(testGame.player1.inProgress).toBe(1);
    expect(testGame.computer.inProgress).toBe(1);
  });

  test("generateComputerShipCoordinates should place 4 ships on computer board", () => {
    const previousBoard = JSON.parse(JSON.stringify(testGame.computer.board));
    testGame.generateComputerShipCoordinates();

    const placedShips = testGame.computer.board
      .flat()
      .filter((cell) => cell > 0).length;
    expect(placedShips).toBeGreaterThanOrEqual(4);
    expect(previousBoard).not.toEqual(testGame.computer.board); // Board should change
  });

  test("computerTurn should change state to PLAYER_TURN after a valid move", () => {
    testGame.startGame();
    testGame.currentState = testGame.states.COMPUTER_TURN;
    testGame.computerTurn();

    expect(testGame.currentState).toBe(testGame.states.PLAYER_TURN);
  });

  test("humanTurn should not work when not PLAYER_TURN", () => {
    testGame.startGame();
    testGame.currentState = testGame.states.COMPUTER_TURN; // Invalid turn
    const result = testGame.humanTurn(3, 3);

    expect(result).toBeUndefined();
    expect(testGame.currentState).toBe(testGame.states.COMPUTER_TURN);
  });

  test("humanTurn should hit computer's board and return correct result", () => {
    const x = 3;
    const y = 3;
    let compResult = testGame.computer.placeShips([x, y], 1, 1);
    testGame.currentState = testGame.states.PLAYER_TURN;
    // Manually place a ship on computer's board for testing

    result = testGame.humanTurn(4, 4);
    expect(result).toBe(0); // Miss

    let result = testGame.humanTurn(x, y);
    expect(result).toBe(1); // Hit
    console.log(testGame.computer.board);
  });

  test("endGame should set state to GAME_OVER and set winner", () => {
    testGame.endGame("player");
    expect(testGame.currentState).toBe(testGame.states.GAME_OVER);
    expect(testGame.winner).toBe("player");
  });
});
