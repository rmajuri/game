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
    let newGuess = Number.parseInt(guess, 10);
    if (typeof newGuess !== 'number' || newGuess < 1 || newGuess > 100) {
      throw 'That is an invalid guess.'
    } 
    this.playersGuess = newGuess;
    return this.checkGuess();
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
      this.pastGuesses.push(this.playersGuess);
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
 return array.join(', ');
}

function newGame() {
  return new Game;
}


function playGame() {
    let game = newGame();

submitButton.addEventListener('click', () => {
  const currentGuess = newGuess.value;
  newGuess.value = '';


});


}

playGame();