import "./styles.css";
import { game } from "./game";

const $playerGrid = document.querySelector("#player-grid");
const $computerGrid = document.querySelector("#computer-grid");
const $startGame = document.querySelector("#start-game-btn");
const $randomize = document.querySelector("#randomize-btn");
const $startNewGame = document.querySelector("#start-new-game-btn");
const Game = new game("player");

$startGame.addEventListener("click", startGame);
$randomize.addEventListener("click", randomize);
$startNewGame.addEventListener("click", refresh);

function refresh() {
  window.location.reload();
}

function randomize() {
  var result = Game.playerRandomize();
  updatePlayerBoard();
}

function startGame() {
  Game.startGame();
}

function updatePlayerBoard() {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const currCell = document.querySelector("#cell-" + i + "" + j);
      currCell.classList.remove("occupied");
      if (Game.player1.board[i][j] > 0) {
        currCell.classList.add("occupied");
      }
    }
  }
}

function renderPlayerBoard() {
  var result = Game.computerTurn();
  const cell = document.querySelector("#cell-" + result[1] + "" + result[2]);
  // console.log(result);
  if (result[0] === 1 || result[0] === 2) {
    cell.classList.remove("occupied");
    cell.classList.remove("cells");
    cell.classList.add("hit");
    var id = 4 - result[3];
    const ship = document.querySelector("#player-list").children[id];

    var n = 0;
    Array.from(ship.children).forEach((cell) => {
      if (cell.classList.contains("unhit") && n === 0) {
        cell.classList.remove("unhit");
        cell.classList.add("hit");
        n = 1;
      }
    });
    if (result[0] === 1) {
      renderPlayerBoard();
    }
    if (result[0] === 2) {
      const heading = document.querySelector("#winner-headline");
      heading.innerHTML = "<h1>Computer Wins<h1>";
      heading.style.visibility = "visible";
    }
  } else if (result[0] === 0) {
    // console.log(cell);
    cell.classList.remove("cells");
    cell.classList.add("miss");
  }
}

function renderGameState(event) {
  const cell = event.target;
  const idParts = cell.id.split("-");
  const r = Number(idParts[1][0]);
  const c = Number(idParts[1][1]);
  var result = Game.humanTurn(r, c);
  console.log(result);
  if (result[0] === 1 || result[0] === 2) {
    cell.classList.remove("cells");
    cell.classList.add("hit");

    var id = 4 - result[1];
    const ship = document.querySelector("#computer-list").children[id];

    var n = 0;
    Array.from(ship.children).forEach((cell) => {
      if (cell.classList.contains("unhit") && n === 0) {
        cell.classList.remove("unhit");
        cell.classList.add("hit");
        n = 1;
      }
    });
    if (result[0] === 2) {
      // console.log(result);
      const heading = document.querySelector("#winner-headline");
      heading.innerHTML = "<h1>PLayer Wins<h1>";
      heading.style.visibility = "visible";
    }
  } else if (result[0] === 0) {
    cell.classList.remove("cells");
    cell.classList.add("miss");

    renderPlayerBoard();
  }
}

for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    const gridComp = document.createElement("div");
    const gridPlayer = document.createElement("div");
    gridComp.classList.add("cells");
    gridComp.id = "cell-" + i + "" + j;
    gridPlayer.classList.add("cells");
    gridPlayer.id = "cell-" + i + "" + j;
    $playerGrid.appendChild(gridComp);
    $computerGrid.appendChild(gridPlayer);
  }
}

Array.from($computerGrid.children).forEach((cell) => {
  cell.addEventListener("click", renderGameState);
});

Game.placePlayerShipsRandomly();
updatePlayerBoard();
