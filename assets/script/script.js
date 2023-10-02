function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

const buttons = document.querySelectorAll(".key-row button");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleButtonClick(btn));
  btn.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "#515151";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "#313131";
  });
});

const upperDisplay = document.querySelector("#upper-display");
const lowerDisplay = document.querySelector("#lower-display");
const MAX_LENGTH = 12;
let num1 = "";
let num2 = "";
let operator = "";
let num1Assign = true;
let num2Assign = false;

function writeToScreen() {
  return lowerDisplay.textContent.length < MAX_LENGTH;
}

function assignNum() {
  if (num1Assign) {
    num1 = Number(lowerDisplay.textContent);
  } else {
    num2 = Number(lowerDisplay.textContent);
  }
}

function handleDigits(btn) {
  if (
    !(btn.value === "0" && lowerDisplay.textContent === "") && // to prevent writing 0 as the first digit
    writeToScreen()
  ) {
    // to clear the display after writing the operator
    if (num2Assign && num2 === "") {
      lowerDisplay.textContent = "";
    }

    lowerDisplay.textContent += btn.value;
    assignNum();
  }
}

function handleDot() {
  // !lowerDisplay.textContent.includes(".") to prevent multiple dots
  if (!lowerDisplay.textContent.includes(".") && writeToScreen()) {
    lowerDisplay.textContent += ".";
  }
  // no need to reassign num1 or num2 here as dot is useless unless there is a number after it
  // and when there is a number after it, it will be reassigned in handleDigits() function using
  // assignNum() function
}

function handleOperators(btn) {
  if (
    // activate only once
    num1Assign &&
    // activate if num1 is assigned
    num1 !== "" &&
    //don't activate if there is no number
    !(num2 === "" && num1 === "")
  ) {
    lowerDisplay.textContent = btn.value;
    operator = btn.value;
    num1Assign = false;
    num2Assign = true;
  }
}

function reset() {
  num1 = "";
  num2 = "";
  operator = "";
  num1Assign = true;
  num2Assign = false;
}

function handleEqual() {
  if (num1 !== "" && num2 !== "") {
    let result = 0;
    result = Number(operate(num1, num2, operator).toFixed(2));
    lowerDisplay.textContent = "";
    upperDisplay.textContent = result;
    // add bette result handling especially for those which
    // contain a lot of decimal places so they don't overflow display
    reset();
  }
}

function handleAc() {
  upperDisplay.textContent = "0";
  lowerDisplay.textContent = "";
  reset();
}

function handleDel() {
  if (lowerDisplay.textContent === "") {
    assignNum();
    return;
  } else {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(
      0,
      lowerDisplay.textContent.length - 1
    );
    assignNum();
  }
}

function handlePlusMinus() {
  if (lowerDisplay.textContent.startsWith("-")) {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(
      1,
      lowerDisplay.textContent.length + 1
    );
  } else {
    lowerDisplay.textContent = "-" + lowerDisplay.textContent;
  }
  assignNum();
}

function handleButtonClick(btn) {
  let btnClass = btn.className;
  let btnId = btn.id;
  if (btnClass === "digit") {
    // btnClass is used for multiple buttons with the same class
    handleDigits(btn);
  } else if (btnId === "dot") {
    // btnId is used for one button with that unique id
    handleDot();
  } else if (btnClass === "operator") {
    handleOperators(btn);
  } else if (btnId === "equal") {
    handleEqual();
  } else if (btnId === "ac") {
    handleAc();
  } else if (btnId === "delete") {
    handleDel();
  } else if (btnId === "pm") {
    handlePlusMinus();
  }
}

function operate(num1, num2, operator) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;

    // handle default behavior later
    default:
      break;
  }
  return result;
}
