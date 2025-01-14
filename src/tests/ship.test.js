import { ship } from "../ship";
test("ship initialization", () => {
  const exampleShip = new ship(1, 4, [0, 0], 1);
  expect(exampleShip).toEqual({
    id: 1,
    size: 4,
    health: 4,
    isSunk: false,
    coordinates: [0, 0],
    dir: 1,
  });
});
describe("onHit functions:", () => {
  test("ship with length 2:", () => {
    const exampleShip = new ship(1, 2, [0, 0], 1);
    exampleShip.onHit();
    expect(exampleShip.isSunk).toBe(false);
  });
  test("ship with length 1:", () => {
    const exampleShip = new ship(1, 1, [0, 0], 1);
    exampleShip.onHit();
    expect(exampleShip.isSunk).toBe(true);
  });
});
