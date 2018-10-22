'use strict'
var result = 0;
var Calculator = {
    add: function add(num) {
        if (num !== undefined) {
            Calculator.result += num;
        }
        return add;
    },
    subtract: function subtract(num) {
        if (num !== undefined) {
            Calculator.result -= num;
        }
        return subtract;
    },
    divide: function divide(num) {
        if (num !== undefined) {
            Calculator.result /= num;
        }
        return divide;
    },
    multiply: function multiply(num) {
        if (num !== undefined) {
            Calculator.result *= num;
        }
        return multiply;
    },
    reset: function () {
        this.result = 0;
    },
    getResult: function () {
        return this.result;
    },
};
module.exports = Calculator;

