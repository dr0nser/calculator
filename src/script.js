// components
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.getElementById("clear");
const back = document.getElementById("back");
const equals = document.getElementById("equals");
const equationView = document.getElementById("equation");
const resultView = document.getElementById("result");

// variables
let num1 = '', num2 = '', result = '', operator = '';

// when any number is clicked
numbers.forEach(number => number.addEventListener("click", function() {
    let value = number.value;
    // when entering value for num1
    if (operator == '') { // taking input for num1
        if (num1 == '' && value == '0') { // add as first value
            num1 += value;
        } else if (num1 == '0' && value != '0') { // discard leftmost 0 
            num1 = value;
        } else if (num1 == 'Infinity') {
            num1 = value;
        } else if (value == '.' && num1.includes('.')) {
            // dont add decimal
        } else {
            num1 += value;
        }
    } else { // taking input for num2
        if (num2 == '0' && value == '0') { // add as first value
            num2 += value;
        } else if (num2 == '0' && value != '0') { // discard leftmost 0 
            num1 = value;
        } else if (value == '.' && num2.includes('.')) {
            // dont add decimal
        } else {
            num2 += value;
        }
    }
    refreshDisplay();
}));

// when any operator is clicked
operators.forEach(oprtr => oprtr.addEventListener("click", function () {
    if (num2 == '') { // change to clicked operator
        operator = oprtr.value;
        refreshDisplay();
    } else if (num2 != '') {
        executeOperation(); // complete current calculation
        resultDisplay();
        // previous calculation's result will be this step's num1
        num1 = result;
        // make num2 empty
        num2 = '';
        // update operator to current operator
        operator = oprtr.value;
        refreshDisplay();
    }
}));

equals.onclick = () => {
    if (num1 != '' && operator != '' && num2 != '') {
        executeOperation();
        resultDisplay();
        num1 = result;
        operator = '';
        num2 = '';
        refreshDisplay();
    }
}

// special button 
clear.onclick = () => {
    num1 = '';
    operator = '';
    num2 = '';
    result = '';
    resultDisplay();
    refreshDisplay();
}

back.onclick = () => {
    if (num2 != '') {
        num2 = num2.substring(0, num2.length - 1);
    } else if (operator != '') {
        operator = '';
    } else if (num1 != '') {
        num1 = num1.substring(0, num1.length - 1);
    }
    refreshDisplay();
}

// methods
function executeOperation() {
    // operations will be executed only when 
    // num1, operator and num2 will have some value
    if (num1 != '' && operator != '' && num2 != '') {
        switch(operator) {
            case '/':
                divide();
                break;
            case '*':
                multiply();
                break;
            case '+':
                add();
                break;
            case '-':
                subtract();
                break;
        }
    } else if (num1 != '') {
        resultDisplay();
    }
}

// refresh display
function refreshDisplay() {
    let displayString = '';
    if (num1 == '') {
        displayString = '0';
    } else {
        displayString += num1;
    }
    if (operator != '') {
        displayString += ` ${operator}`;
    }
    if (num2 != '') {
        displayString += ` ${num2}`;
    }
    equationView.innerHTML = displayString;
}

// results display 
function resultDisplay() {
    let displayString = '';
    if (num1 != '' && operator == '' && num2 == '') {
        displayString = `Ans = ${num1}`;
    } else if (num1 == '') {
        displayString = 'Ans = 0';
    } else {
        displayString = `${num1} ${operator} ${num2} =`;
    }
    resultView.innerHTML = displayString;
}

// math functions
function divide() {
    if (num1 == 'Infinity') {
        result = 'Infinity';
    } else if (num2 == '0') { // something divided by 0 = infinity
        result = 'Infinity';
    } else { // both num1 and num2 are numbers
        // if any of num1 or num2 is in float then result will be in float
        let a = (num1.includes('.') || num2.includes('.')) ? parseFloat(num1) : parseInt(num1);
        let b = (num1.includes('.') || num2.includes('.')) ? parseFloat(num2) : parseInt(num2);
        result = (a / b).toString();
        result = result.length > 15 ? result.substring(0, 15) : result;
    }
}

function multiply() {
    if (num1 == 'Infinity') {
        result = (num2 == '0') ? '0' : 'Infinity';
    } else { // both num1 and num2 are numbers
        // if any of num1 or num2 is in float then result will be in float
        let a = (num1.includes('.') || num2.includes('.')) ? parseFloat(num1) : parseInt(num1);
        let b = (num1.includes('.') || num2.includes('.')) ? parseFloat(num2) : parseInt(num2);
        result = (a * b).toString();
        result = result.length > 15 ? result.substring(0, 15) : result;
    }
}

function add() {
    if (num1 == 'Infinity') { // adding anything to infinity dosen't make a difference
        result = 'Infinity';
    } else { // both num1 and num2 are numbers
        // if any of num1 or num2 is in float then result will be in float
        let a = (num1.includes('.') || num2.includes('.')) ? parseFloat(num1) : parseInt(num1);
        let b = (num1.includes('.') || num2.includes('.')) ? parseFloat(num2) : parseInt(num2);
        result = (a + b).toString();
        result = result.length > 15 ? result.substring(0, 15) : result;
    }
}

function subtract() {
    if (num1 == 'Infinity') { // adding anything to infinity dosen't make a difference
        result = 'Infinity';
    } else { // both num1 and num2 are numbers
        // if any of num1 or num2 is in float then result will be in float
        let a = (num1.includes('.') || num2.includes('.')) ? parseFloat(num1) : parseInt(num1);
        let b = (num1.includes('.') || num2.includes('.')) ? parseFloat(num2) : parseInt(num2);
        result = (a - b).toString();
        result = result.length > 15 ? result.substring(0, 15) : result;
    }
}

// keyboard events
const keyboardOperators = '/*+-', validNumbers = '0123456789.';
document.onkeydown = (event) => {
    const keyName = event.key;
    if (keyboardOperators.includes(keyName)) {
        if (num2 == '') { // change to clicked operator
            operator = keyName;
            refreshDisplay();
        } else if (num2 != '') {
            executeOperation(); // complete current calculation
            resultDisplay();
            // previous calculation's result will be this step's num1
            num1 = result;
            // make num2 empty
            num2 = '';
            // update operator to current operator
            operator = keyName;
            refreshDisplay();
        }
    } else if (validNumbers.includes(keyName)) {
        // when entering value for num1
        if (operator == '') { // taking input for num1
            if (num1 == '' && keyName == '0') { // add as first value
                num1 += keyName;
            } else if (num1 == '0' && keyName != '0') { // discard leftmost 0 
                num1 = keyName;
            } else if (num1 == 'Infinity') {
                num1 = keyName;
            } else if (keyName == '.' && num1.includes('.')) {
                // dont add decimal
            } else {
                num1 += keyName;
            }
        } else { // taking input for num2
            if (num2 == '0' && keyName == '0') { // add as first value
                num2 += keyName;
            } else if (num2 == '0' && keyName != '0') { // discard leftmost 0 
                num1 = keyName;
            } else if (keyName == '.' && num2.includes('.')) {
                // dont add decimal
            } else {
                num2 += keyName;
            }
        }
        refreshDisplay();
    } else if (keyName == 'Enter') {
        if (num1 != '' && operator != '' && num2 != '') {
            executeOperation();
            resultDisplay();
            num1 = result;
            operator = '';
            num2 = '';
            refreshDisplay();
        }
    } else if (keyName == 'Backspace') {
        if (num2 != '') {
            num2 = num2.substring(0, num2.length - 1);
        } else if (operator != '') {
            operator = '';
        } else if (num1 != '') {
            num1 = num1.substring(0, num1.length - 1);
        }
        refreshDisplay();
    }
}