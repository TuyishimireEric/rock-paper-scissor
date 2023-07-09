let draw=0, won=0, lost=0;

const getComputerChoice = () => {
    let randomNumber = Math.floor(Math.random()*3);
    switch (randomNumber) {
        case 0:
            return 'rock';
        break;
        case 1:
            return 'paper';
        break;
        case 2:
            return 'scissor';
        break;
        default:
            getComputerChoice();
        break;
    }
}

const getPlayerChoice = () => {
    let playerInput = prompt('Please enter your choice: ');
    if(!playerInput.match(/rock|scissor|paper/gi)){
        console.log("Invalid input");
        getPlayerChoice();
    }
    return playerInput.toLowerCase().trim();
}

const playerRound = (computerSelection, playerSelection) => {
    if(playerSelection == computerSelection){
        draw++;
        return `⭕ Draw! you both selected ${playerSelection}`
    }
    else if(playerSelection == 'rock'){
        if(computerSelection == 'scissor'){
            won++;
            return `✔ You won! your Rock beats Scissor`;
        }else{
            lost++;
            return `❌ You lose! Paper beats your Rock`;
        }
    }
    else if(playerSelection == 'paper'){
        if(computerSelection == 'rock'){
            won++;
            return `✔ You won! your Paper beats Rock`;
        }else{
          lost++;
            return `❌ You lose! Scissor beats your Paper`;
       }
    }else{
        if(computerSelection == 'paper'){
            won++;
            return `✔ You won! your Scissor beats Paper`;
        }else{
          lost++;
            return `❌ You lose! Rock beats your Scissor`;
       }
    }
}

const result=()=>{
    if(won>lost){
        return `
        ==============================================
                               WON 😎
                            
                        Won: ${won} Lost: ${lost}
        ==============================================
        `;
    }
    else if(won==lost){
        return `
        ==============================================
                               DRAW 🤝
                            
                        Won: ${won} Lost: ${lost}
        ==============================================
        `;
    }
    else {
        return `
        ==============================================
                               LOST 😰
                            
                        Won: ${won} Lost: ${lost}
        ==============================================
        `;

    }
}

const game=()=>{
    for(let i=0; i<5; i++){
        console.log(`Round ${i+1}`);
        console.log(playerRound(getComputerChoice(), getPlayerChoice()));
        console.log("----------------")
    }

    console.log(result());
}

game();