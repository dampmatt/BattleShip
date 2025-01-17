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
  test("if missile hits an unmarked position", () => {
    expect(exampleGameboard.missileHit(4, 4)).toBe(-1);
  });
  test("if missile hits marked position:", () => {
    expect(exampleGameboard.missileHit(0, 0)).toBe(0);
  });
});

describe("shipDirChange method tests", () => {
  const exampleGameboard = new gameBoard("utkarsh");
  exampleGameboard.placeShips([0, 0], 4, 1);
  // test("does the method work", () => {
  //   // console.log(exampleGameboard.board);
  //   expect(exampleGameboard.shipDirChange(exampleGameboard.ships[0])).toBe(1);
  // });
  // test("does the method change directions:", () => {
  //   exampleGameboard.shipDirChange(exampleGameboard.ships[0]);
  //   expect(exampleGameboard.board).toEqual([
  //     [1, 1, 1, 1, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //   ]);
  // });
  test("what happens when there is already a ship present on the board at some point else in the path of ship:", () => {
    exampleGameboard.placeShips([0, 1], 2, 1);
    var result = exampleGameboard.shipDirChange(exampleGameboard.ships[0]);
    console.log(exampleGameboard.board);
    expect(result).toBe(0);
  });
  test("ship out of bounds", () => {
    exampleGameboard.placeShips([0, 6], 4, 1);
    var result = exampleGameboard.shipDirChange(exampleGameboard.ships[2]);
    // console.log(exampleGameboard.board);
    expect(result).toBe(2);
  });
});
