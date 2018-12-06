'use strict'
function Hangman (word) {
  this.word = word.toLowerCase();
  this.result = new Array(word.length).fill('_');
  this.errors = 6;
  this.errorSymbols = [];
  this.message = '';

  this.guess = function (letter) {
    var idx = this.word.indexOf(letter);
    var word = this.word.split('');
    if (idx !== -1) {
      for (var i = 0; i < word.length;i++) {
        if (letter === word[i]) {
          this.result[i] = letter;
        }
      }
      this.message = this.result.join('');
      if (this.result.indexOf('_') === -1) {
        this.message += ' |  You won!';
      }
      console.log(this.message);
    } else {
      this.errors--;
      this.errorSymbols.push(letter);
      this.message = 'wrong letter, errors left ' + this.errors + ' | ' + this.errorSymbols;
      console.log(this.message);
    }
    return this;
  }
  this.getGuessedString = function () {
    console.log(this.result.join(''));
    return this;
  }
  this.getErrorsLeft = function () {
    console.log(this.errors);
    return this;
  }
  this.getWrongSymbols = function () {
    console.log(this.errorSymbols);
    return this;
  }
  this.getStatus = function () {
    console.log(this.result.join('') + ' | errors left ' + this.errors);
    return this;
  }
  this.startAgain = function (newWord) {
    this.word = newWord.toLowerCase();
    this.result = new Array(newWord.length).fill('_');
    this.errors = 6;
    this.errorSymbols = [];
    this.message = '';
    return this;
  }
}
module.exports = new Hangman;
