let score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    losses:0,
    ties:0
}
updateScore();
function playGame(playerMove){
    const computerMove=pickComputerMove();
    let result='';
    if(playerMove==='rock'){
        if(computerMove==='rock'){
            result='Tie.'
        }else if(computerMove==='paper'){
            result='Lose!'
        }else if(computerMove==='scissors'){
            result='Win.'
        }
    }else if(playerMove==='paper'){
        if(computerMove==='rock'){
            result='Win.';
        }else if(computerMove==='paper'){
            result='Tie.'
        }else if(computerMove==='scissors'){
            result='Lose!'
        }
    }else if(playerMove==='scissors'){
        if(computerMove==='rock'){
            result='Lose!'
        }else if(computerMove==='paper'){
            result='Win.'
        }else if(computerMove==='scissors'){
            result='Tie.'
        }
    }
    if(result==='Win.'){
        score.wins++;
    }else if(result==='Tie.'){
        score.ties++;
    }else if(result==='Lose!'){
        score.losses++;
    }

        localStorage.setItem('score',JSON.stringify(score));
        updateScore();
        document.querySelector('.para1').innerHTML=result;
        document.querySelector('.para2').innerHTML=`
        You <img src="images/${playerMove}-emoji.png"> V/S <img src="images/${computerMove}-emoji.png"> Computer
        `;
}
function updateScore(){
    document.querySelector('.para3').innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}
function pickComputerMove(){
    let randomNumber=Math.random();

    let computerMove='';

    if(randomNumber>=0 && randomNumber<1/3){
      computerMove='rock';
    }else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove='paper'
    }else if(randomNumber>=2/3 && randomNumber<1){
        computerMove='scissors'
    }
    return computerMove;
}
document.querySelector('.rock').addEventListener('click',()=>{
    playGame('rock');
});
document.querySelector('.paper').addEventListener('click',()=>{
    playGame('paper');
});
document.querySelector('.scissors').addEventListener('click',()=>{
    playGame('scissors');
});
document.querySelector('.reset').addEventListener('click',()=>{
    score.wins=0;
    score.ties=0;
    score.losses=0;
    localStorage.setItem(score,JSON.stringify('score'));
    updateScore();
});

let isAutoPlaying=false;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        intervalId=setInterval(()=>{
            const playerMove=pickComputerMove();
            playGame(playerMove);
              

        },1000);
        isAutoPlaying=true;
      
    }else {
        clearInterval(intervalId);
        isAutoPlaying=false;
    
    }
}
document.querySelector('.auto-play').addEventListener('click',()=>{
    autoPlay();
})
