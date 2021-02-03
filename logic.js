let board = document.querySelector("#board");
let header = document.querySelector(".header");
let startBtn = document.querySelector("#start-btn");
let restartBtn = document.querySelector("#restart-btn");
let winnerPopup = document.querySelector("#winner-popup");
let botBtn;
let twoPlayerBtn;

startBtn.addEventListener("click", () => {
  header.style.animation = "header 2s";
  header.style.top = "5%";
  startBtn.style.display = "none";
  //   create two btns for game modes , ai or two players
  botBtn = document.createElement("button");
  botBtn.innerHTML = `Bot <i class="fas fa-robot"></i>`;
  twoPlayerBtn = document.createElement("button");
  twoPlayerBtn.innerHTML = `Two Player <i class="fas fa-user-friends"></i>`;
  botBtn.classList.add("btn", "btn-danger", "me-3");
  twoPlayerBtn.classList.add("btn", "btn-primary");
  header.appendChild(botBtn);
  header.appendChild(twoPlayerBtn);
  //   add eventlistener to two player btn
  twoPlayerBtn.addEventListener("click", StartPlayerTwoMode);
});

function StartPlayerTwoMode() {
  // display game board
  board.style.visibility = "visible";
  // render game board

  // display restart button
  restartBtn.style.visibility = "visible";
  //   clears removes buttons from header
  clearHeader();
  // add  status: gamemode,score,number of turns left
  //   Playing against another player
  //         player 1: 1 | player 2: 2
  //   out of 3 turns played 1
  renderStatus();
}
//  event delegation on board element
board.addEventListener("click", function (e) {
  if (e.target.classList.contains("tile")) {
    game.makeMove(e.target.getAttribute("data-index"));
    renderBoard();
    // update turn
    updateTurn();
    // display winner of the round
    if (!game.isInProgress()) {
      let displayWinner = document.querySelector("#winner");
      // deactivate restart button
      restartBtn.setAttribute("disabled", true);
      //
      if (game.isWinningCombination()) {
        displayWinner.innerHTML = `THE WINNER OF THIS ROUND IS <span>${game.turn}<span> `;
        // highlight the winning combination
        highlightCombo();
      } else {
        // tie
        displayWinner.innerText = ` THE ROUND ENDED WITH A DRAW`;
      }
      winnerPopup.style.visibility = "visible";
    }
  }
});
function highlightCombo() {
  let [a, b, c] = game.isWinningCombination();
  let tiles = document.querySelectorAll(".tile");
  tiles[a].style.background = "green";
  tiles[b].style.background = "green";
  tiles[c].style.background = "green";
}
function removeHighlights() {
  let [a, b, c] = game.isWinningCombination();
  let tiles = document.querySelectorAll(".tile");
  tiles[a].style.background = "white";
  tiles[b].style.background = "white";
  tiles[c].style.background = "white";
}

winnerPopup.addEventListener("click", function (e) {
  if (e.target.id == "winner-popup") {
    e.target.style.visibility = "hidden";
    // inable restart btn
    restartBtn.removeAttribute("disabled");
    // update score
    game.updateScore();
    // remove tile highlights
    removeHighlights();
    //
    let x = document.querySelector("#scorex");
    let o = document.querySelector("#scoreo");
    x.innerText = game.score[0] == 0 ? "-" : game.score[0];
    o.innerText = game.score[1] == 0 ? "-" : game.score[1];
    game.resetBoard();
    renderBoard();
    updateTurn();
  }
});

restartBtn.addEventListener("click", function () {
  game.resetBoard();
  game.resetScore();
  resetStatus();
  renderBoard();
});
function resetStatus() {
  let x = document.querySelector("#scorex");
  let o = document.querySelector("#scoreo");
  let currentTurn = document.querySelector("#current-turn");
  x.innerText = "-";
  o.innerText = "-";
  currentTurn.innerText = "start game by clicking block";
}
function updateTurn() {
  let currentTurn = document.querySelector("#current-turn");
  if (game.isInProgress()) {
    currentTurn.innerText = `${game.turn} Turn`;
  } else {
    currentTurn.innerText = `Game Over`;
  }
}

function renderBoard() {
  let gameBoard = game.board;
  let tiles = document.querySelectorAll(".tile");
  tiles.forEach(function (item, index) {
    item.textContent = gameBoard[index];
  });
}
function renderStatus() {
  // create two buttons to keep track of player's score
  let btnDiv = document.createElement("div");
  btnDiv.setAttribute("id", "btn-div");
  btnDiv.classList.add("d-flex", "justify-content-between");
  let x, o;
  x = document.createElement("button");
  o = document.createElement("button");
  x.classList.add("btn", "btn-dark");
  o.classList.add("btn", "btn-dark");
  x.innerHTML = `<i>X</i><i id="scorex">-</i>`;
  o.innerHTML = `<i>O</i><i id="scoreo">-</i>`;
  // create a paragraph tag that will display who's turn it is
  let pElement = document.createElement("p");
  pElement.innerText = "start game by clicking block";
  pElement.setAttribute("id", "current-turn");
  // append to header div
  btnDiv.appendChild(x);
  btnDiv.appendChild(o);
  header.appendChild(btnDiv);
  header.appendChild(pElement);
}

// clear header
function clearHeader() {
  let header = document.querySelector(".header");
  while (header.childElementCount > 2) {
    header.removeChild(header.lastChild);
  }
}
//
class Game {
  constructor() {
    (this.turn = "X"), (this.board = new Array(9).fill(null));
    // score will keep score of who is winning the game
    this.score = new Array(2).fill(0);
  }
  nextTurn() {
    this.turn = this.turn == "X" ? "O" : "X";
  }
  makeMove(x) {
    // if the game is not in progress ; dont make another move.
    if (!this.isInProgress()) {
      return;
    }
    // if board[x] has a value/not null , dont make move and dont go to the next turn.
    if (this.board[x]) {
      return;
    }
    this.board[x] = this.turn;
    // if there is no winning combo proceed to the next turn.
    if (!this.isWinningCombination()) {
      this.nextTurn();
    }
  }
  isWinningCombination() {
    let winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombo) {
      let [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] == this.board[b] &&
        this.board[a] == this.board[c]
      ) {
        return combo;
      }
    }
    return null;
  }
  isInProgress() {
    //game is over when winning combo is true and also when board does not include null
    return !this.isWinningCombination() && this.board.includes(null);
  }
  updateScore() {
    if (this.isWinningCombination()) {
      let winner = this.turn;
      if (winner == "X") {
        this.score[0] += 1;
      } else {
        this.score[1] += 1;
      }
    } else {
      // tied games increases both player's scores
      this.score[0] += 1;
      this.score[1] += 1;
    }
  }
  resetBoard() {
    this.board = new Array(9).fill(null);
    this.turn = "X";
  }
  resetScore() {
    this.score = new Array(2).fill(0);
  }
}

const game = new Game();
