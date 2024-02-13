let IntervalId;
const Score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();
let isAutoPlaying = JSON.parse(localStorage.getItem('autoplaying')) || false;
autoPlay();

function updateScoreElement() {
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-move').innerHTML = '';
  document.querySelector(
    '.js-score'
    ).innerHTML = `Wins: ${Score.wins}, Losses: ${Score.losses}, Ties: ${Score.ties}`;
  }
  
function autoPlay() {
  localStorage.setItem('autoplaying', JSON.stringify(isAutoPlaying));
  if(!isAutoPlaying) {
    IntervalId = setInterval(
      () => {
        const playerMove = pickComputerMove();
        play(playerMove);
      },
      1000
    );
    isAutoPlaying = true;
  } else {
    clearInterval(IntervalId);
    isAutoPlaying = false;
    updateScoreElement();
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  
  if (randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  return computerMove;
}

document.querySelector('.js-rock-button').
addEventListener(
  'click',
  () => {
    play('rock')
  }
);

document.querySelector('.js-paper-button').
addEventListener(
  'click',
  () => {
    play('paper')
  }
);

document.querySelector('.js-scissors-button').
addEventListener(
  'click',
  () => {
    play('scissors')
  }
);

document.querySelector('.js-reset-score-button').
addEventListener(
  'click',
  () => {
    reset();
  }
);

document.querySelector('.js-auto-play-button').
addEventListener(
  'click',
  () => {
    autoPlay();
  }
);

document.body.addEventListener(
  'keydown', 
  (event) => {
  console.log(event.key);
  if(event.key === 'r' || event.key === 'R') play('rock');
  else if(event.key === 'p' || event.key === 'P') play('paper');
  else if(event.key === 's' || event.key === 'S') play('scissors');
}
);

let displayingReset = false;
let timeoutId;

function play(playerMove) {
  let computerMove = pickComputerMove();
  
  let result = '';
  
  if (playerMove === computerMove) {
    result = `It's a tie`;
  } else if (playerMove === 'rock' && computerMove === 'scissors')
  result = 'You win';
  else if (playerMove === 'paper' && computerMove === 'rock')
  result = 'You win';
  else if (playerMove === 'scissors' && computerMove === 'paper')
  result = 'You win';
  else result = 'You lose';

  if (result === 'You win') {
    Score.wins++;
  } else if (result === 'You lose') {
    Score.losses++;
  } else {
    Score.ties++;
  }

  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(Score));
  if(displayingReset) {
    document.querySelector('.js-reset-score').innerHTML = '';
    displayingReset = false;
  }
  document.querySelector('.js-result').innerHTML = `${result}.`;
  document.querySelector('.js-move').innerHTML = 
  `You <img src="/Images/${playerMove}-emoji.png" alt="${playerMove}" class="move-icon"/> 
  <img src="/Images/${computerMove}-emoji.png" alt="${computerMove}" class="move-icon"/> Computer`;
}

function reset() {
  localStorage.removeItem('score');
  Score.wins = Score.losses = Score.ties = 0;
  updateScoreElement();
  if(!displayingReset) {
    document.querySelector('.js-reset-score').innerHTML = 'Score Reset.';
    document.querySelector('.js-move').innerHTML = '';
    timeoutId = setTimeout(() => {
      document.querySelector('.js-reset-score').innerHTML = '';
    }, 2000);
    displayingReset = true;
  }
  else {
    displayingReset = false;
    clearTimeout(timeoutId);
    reset();
  }

  if(isAutoPlaying === true) {
    autoPlay();
  }
}