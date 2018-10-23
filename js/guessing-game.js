/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.winningNumber - this.playersGuess);
  }
  playersGuessSubmission(guess) {
    if (guess === 'reset') {
      document.querySelector('#guess-feedback').innerHTML = 'You\'ve got 5 guesses!';
    } else {
      let newGuess = Number.parseInt(guess, 10);
      if (Number.isNaN(newGuess) || newGuess < 1 || newGuess > 100) {
        document.querySelector('#guess-feedback').innerHTML = 'That is an invalid guess.';
      } else {
        this.playersGuess = newGuess;
        return this.checkGuess();
      }
    }
  }
  checkGuess() {
    let message = '';

    if (this.pastGuesses[this.pastGuesses.length - 1] === this.winningNumber) {
        message = 'You Win!';
    } else if (this.pastGuesses.length === 5) {
        message = 'You Lose.';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
        message = 'You have already guessed that number.'
    } else {
      let difference = this.difference();
      if (this.pastGuesses.length < 5) {
        this.pastGuesses.push(this.playersGuess);
        document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
      }
      if (this.pastGuesses.length === 5 && this.playersGuess !== this.winningNumber) {
          message = 'You Lose.';
      } else if (this.playersGuess === this.winningNumber) {
          message = 'You Win!';
      } else if (difference < 10) {
          message = 'You\'re burning up!';
      } else if (difference < 25) {
          message = 'You\'re lukewarm.';
      } else if (difference < 50) {
          message = 'You\'re a bit chilly.';
      } else {
          message = 'You\'re ice cold!';
      }
    }

    document.querySelector('#guess-feedback').innerHTML = message;

    return message;
  }
  provideHint() {
    let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
  }
}

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle (array) {
let n = array.length;
let currentEl;
let randomIdx;
  while (n) {
    randomIdx = Math.floor(Math.random() * n--);
    currentEl = array[n];
    array[n] = array[randomIdx];
    array[randomIdx] = currentEl;
  }
  const hint = `Could be ${array[0]}. Or ${array[1]}. But maybe ${array[2]}.`
 return hint;
}

function newGame() {
  return new Game;
}

function playGame() {

  let game = newGame();

  const submitButton = document.getElementById('submit');
  const hintButton = document.getElementById('hint');
  const resetButton = document.getElementById('reset');
  const input = document.getElementById('player-input');


  input.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
      submitButton.click();
    }
  });

  submitButton.addEventListener('click', () => {
    const currentGuess = +document.getElementById('player-input').value;
    document.getElementById('player-input').value = '';
  
    game.playersGuessSubmission(currentGuess);
  });

  hintButton.addEventListener('click', () => {
    document.querySelector('#guess-feedback').innerHTML = game.provideHint();
  });

  resetButton.addEventListener('click', () => {
    game.pastGuesses = [];
    game.playersGuessSubmission('reset');
    game.winningNumber = generateWinningNumber();
    for (let i = 1; i <= 5; i++) {
      document.querySelector(`#guess-list li:nth-child(${i})`).innerHTML = `_`;
    }
  });

  

}

playGame();
