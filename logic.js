let board = document.querySelector("#board");
let header = document.querySelector(".header");
let startBtn = document.querySelector("#start-btn");
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
  board.style.visibility = "visible";
  //   clears removes buttons from header
  clearHeader();
  //   status: gamemode,score,number of turns left
}

// clear header
function clearHeader() {
  let header = document.querySelector(".header");
  while (header.childElementCount > 2) {
    header.removeChild(header.lastChild);
  }
}
