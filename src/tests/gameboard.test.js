import { gameBoard } from "./../gameboard";

describe("gameboard initialization test", () => {
  test("test for example gameboard", () => {
    const gameboard = new gameBoard("player");
    expect(gameboard).toEqual({
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      pointer: 10,
      points: 10,
      ships: [],
      owner: "player",
      inProgress: 0,
      isOver: 0,
      rows: 7,
      columns: 7,
    });
  });
});

describe("testing place ships method:", () => {
  const gameboard = new gameBoard("player");
  test("testing for simple ship placement", () => {
    expect(gameboard.placeShips([0, 0], 4, 1)).toBe(1);
  });
  test("testing for overlap", () => {
    gameboard.placeShips([0, 0], 4, 1);
    expect(gameboard.placeShips([0, 0], 2, 0)).toBe(0);
  });
  test("testing for overlap part2", () => {
    gameboard.placeShips([0, 0], 4, 1);
    expect(gameboard.placeShips([2, 0], 2, 0)).toBe(0);
    // console.log(gameboard.board);
  });
  test("edge cases", () => {
    expect(gameboard.placeShips([6, 6], 2, 0)).toBe(2);
  });
});

describe("missileHit method tests", () => {
  const exampleGameboard = new gameBoard("utkarsh");
  var result = exampleGameboard.placeShips([0, 0], 4, 1);
  // console.log(exampleGameboard.board);
  exampleGameboard.initiateGame();
  console.log(exampleGameboard.ships);
  test("if missile hits an unmarked position", () => {
    expect(exampleGameboard.missileHit(4, 4)).toBe(-1);
    // console.log(exampleGameboard.board);
  });
  test("if missile hits marked position:", () => {
    expect(exampleGameboard.missileHit(0, 0)).toBe(0);
  });
});
