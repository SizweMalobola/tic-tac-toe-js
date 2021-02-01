let board = document.querySelector("#board");
let header = document.querySelector(".header");
let startBtn = document.querySelector("#start-btn");
let restartBtn = document.querySelector("#restart-btn");
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
  x.innerHTML = `<i class="fas fa-times"></i><i id="scorex">-</i>`;
  o.innerHTML = `<i class="far fa-circle"></i><i id="scoreo">-</i>`;
  // create a paragraph tag that will display who's turn it is
  let pElement = document.createElement("p");
  pElement.innerText = "start game by clicking block";
  pElement.setAttribute("id", "current-turn");
  pElement.classList.add("muted");
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
      console.log(combo);
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
}

const game = new Game();
