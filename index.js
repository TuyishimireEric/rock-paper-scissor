const buttons = document.querySelectorAll(".buttons li");
const result = document.querySelector("#result");
const title = document.querySelector("#title");
const sLost = document.querySelector("#lost");
const sTie = document.querySelector("#tie");
const sWon = document.querySelector("#won");
const Play = document.querySelector("#play");
const overAll = document.querySelector(".overall");
const footer = document.querySelector("footer");
const back = document.querySelector(".back");
const audio = document.querySelector("audio");

const gameOver = (winner) => {
  overAll.classList.remove("active");
  footer.classList.remove("active");
  document.querySelector(".overall p").innerHTML =
    winner == "won" ? `✔ GAME WON!!!` : `❌ GAME LOST!`;
    Play.innerHTML = "Play Again";
};

const paused = () => { 
    overAll.classList.remove("active");
    footer.classList.remove("active");
    document.querySelector(".overall p").innerHTML = "⏸ Game Paused";  
    Play.innerHTML = "Play Again";
}

const update = (tie, won, lost) => {
  sLost.innerHTML = `${lost}`;
  sTie.innerHTML = `${tie}`;
  sWon.innerHTML = `${won}`;
};

const playerRound = (computerSelection, playerSelection) => {
  if (playerSelection == computerSelection) {
    result.innerHTML = `⭕ Tie! you both selected ${playerSelection}`;
    title.innerHTML = "TIE";
    return "tie";
  } else {
    if (
      (playerSelection == "rock" && computerSelection == "scissor") ||
      (playerSelection == "paper" && computerSelection == "rock") ||
      (playerSelection == "scissor" && computerSelection == "paper")
    ) {
      result.innerHTML = `✔ You won!`;
      title.innerHTML = "WON";
      return "won";
    } else {
      result.innerHTML = `❌ You lose!`;
      title.innerHTML = "LOST";
      return "lost";
    }
  }
};

const getComputerChoice = () => {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissor";
    default:
      return getComputerChoice();
  }
};

const start = () => {
  let lost = 0;
  let won = 0;
  let tie = 0;

  const handleButtonClick = (e) => {
    const playerChoice = e.target.className;
    const computerChoice = getComputerChoice();
    const response = playerRound(playerChoice, computerChoice);

    if (response === "tie") {
      tie++;
    } else if (response === "won") {
      won++;
    } else {
      lost++;
    }

    update(tie, won, lost);
    setTimeout(() => {
        title.innerHTML = "Let's Play..";
      result.innerHTML = "waiting...";
    }, 2000);

    if (won > 4) {
        won = 0;
        lost=0;
        tie = 0;
        update(tie, won, lost);
        gameOver("won");
    } else if (lost > 4) {
        won = 0;
        lost=0;
        tie = 0;
        update(tie, won, lost);
        gameOver("lost");
    }
  };

  Play.addEventListener("click", () => {
    overAll.classList.add("active");
    footer.classList.add("active");

    for (const button of buttons) {
      button.addEventListener("click", handleButtonClick);
    }
  });
};

back.addEventListener("click", paused);

window.addEventListener("load", start);
