const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector(".turn");
const restartBtn = document.querySelector(".restart");
const resultText = document.querySelector(".result");
const confettiContainer = document.getElementById("confetti-container");

let board, currentPlayer, gameActive;
let xScore = 0, oScore = 0, tieScore = 0;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// INIT
function initGame(){
  board = ["","","","","","","","",""];
  currentPlayer = "X";
  gameActive = true;
  turnText.textContent = "X TURN";
  resultText.textContent = "";

  cells.forEach(c=>{
    c.textContent="";
    c.classList.remove("x","o");
  });
}

// CONFETTI
function launchConfetti(){
  for(let i=0;i<120;i++){
    const conf = document.createElement("div");
    conf.className = "confetti";
    conf.style.left = Math.random()*100 + "vw";
    conf.style.background =
      Math.random()>0.5 ? "#31c3bd" : "#f2b137";
    conf.style.animationDuration =
      Math.random()*1 + 1.5 + "s";
    confettiContainer.appendChild(conf);
    setTimeout(()=>conf.remove(),2000);
  }
}

// CLICK
cells.forEach(cell=>{
  cell.addEventListener("click",()=>{
    const i = cell.dataset.i;
    if(board[i] || !gameActive) return;

    board[i]=currentPlayer;
    cell.textContent=currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkResult();
  });
});

// CHECK
function checkResult(){
  for(let w of winPatterns){
    const [a,b,c]=w;
    if(board[a] && board[a]===board[b] && board[a]===board[c]){
      gameActive=false;
      resultText.textContent = `${currentPlayer} WON 🎉`;
      launchConfetti();

      currentPlayer==="X"?xScore++:oScore++;
      updateScore();
      return;
    }
  }

  if(!board.includes("")){
    gameActive=false;
    tieScore++;
    resultText.textContent="MATCH DRAW 🤝";
    updateScore();
    return;
  }

  currentPlayer = currentPlayer==="X"?"O":"X";
  turnText.textContent = `${currentPlayer} TURN`;
}

function updateScore(){
  document.querySelector(".x-score strong").textContent=xScore;
  document.querySelector(".o-score strong").textContent=oScore;
  document.querySelector(".tie strong").textContent=tieScore;
}

restartBtn.addEventListener("click",initGame);
initGame();
