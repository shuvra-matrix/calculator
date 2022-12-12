"use strict";

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    // this is not a number
    handelSymbol(value);
  } else {
    // this is a number
    handelNumber(value);
  }
  screen.innerText = buffer;
}

function handelSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "+":
      handelMath(symbol);
      break;
    case "−":
      handelMath(symbol);
      break;
    case "×":
      handelMath(symbol);
      break;
    case "÷":
      handelMath(Symbol);
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer === "0") {
        return;
      } else if (buffer.length === 0) {
        buffer = "0";
      } else {
        buffer = buffer.slice(-buffer.length, -1);
        if (runningTotal === 0 && buffer.length === 0) {
          buffer = "0";
        }
      }
      screen.innerText = buffer;
      break;
  }
}

function handelMath(symbol) {
  if (buffer === "0") {
    // do nothing
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "−":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
}

function handelNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
