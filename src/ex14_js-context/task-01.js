'use strict'
var Calculator = {
  result: 0,

  add: function add (num) {
    if (num !== undefined) {
      this.result += num;
    }
    return this;
  },
  subtract: function subtract (num) {
    if (num !== undefined) {
      this.result -= num;
    }
    return this;
  },
  divide: function divide (num) {
    if (num !== undefined) {
      this.result /= num;
    }
    return this;
  },
  multiply: function multiply (num) {
    if (num !== undefined) {
      this.result *= num;
    }
    return this;
  },
  reset: function () {
    this.result = 0;
    return this;
  },
  getResult: function () {
    return this.result;
  },
  setState: function setState (num) {
    if (num) {
      this.result = num;
    }
    return this;
  },
  fetchData: function (callback) {
    callback.call(this, 500);
  }
}
module.exports = Calculator;