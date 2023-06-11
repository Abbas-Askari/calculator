const display = document.querySelector(".container p");
const buttons = Array.from(document.querySelectorAll("button"));
const dotButton = buttons.find((button) => button.textContent === ".");
const numberButtons = [];
const operatorButtons = [];
let previous = 0;
let lastOperator = "+";
let lastButton;
let displaying = false;
const operators = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "-": (a, b) => a - b,
  "=": (a, b) => b,
};

dotButton.addEventListener("click", () => {
  if (+dotButton.getAttribute("data-enabled")) {
    if (displaying) {
      previous = +display.textContent;
      display.textContent = "";
      displaying = false;
    }
    display.textContent += ".";
    dotButton.setAttribute("data-enabled", "0");
    enableOperators();
  }
});

const enableDot = () => {
  dotButton.setAttribute("data-enabled", "1");
};

buttons.forEach((button) => {
  if (button.textContent.match(/^\d+$/)) {
    button.addEventListener("click", (e) => {
      if (displaying) {
        previous = +display.textContent;
        display.textContent = "";
        displaying = false;
      }
      display.textContent += button.textContent;
      enableOperators();
    });
    numberButtons.push(button);
  }
});

function disableOperators() {
  operatorButtons.forEach((button) => button.setAttribute("data-enabled", "0"));
}

function enableOperators() {
  operatorButtons.forEach((button) => button.setAttribute("data-enabled", "1"));
}

buttons
  .filter((e) => e.textContent in operators)
  .forEach((button) => {
    button.addEventListener("click", () => {
      if (!+button.getAttribute("data-enabled")) return;
      console.log(previous, +display.textContent);
      let result = operators[lastOperator](+previous, +display.textContent);
      previous = +display.textContent;
      display.textContent = result;
      displaying = true;
      lastOperator = button.textContent;
      if (button.textContent !== "=") disableOperators();
      enableDot();
    });
    operatorButtons.push(button);
  });
