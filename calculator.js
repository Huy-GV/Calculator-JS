"use strict"

// const numberKeys = document.querySelectorAll('.number');
const numberKeys = document.querySelectorAll("button[data-type='num']");
// const operationKeys = document.querySelectorAll('.operation');
// const operationKeys = document.querySelectorAll("button[data-type='op']");
const operationKeys = document.querySelectorAll("button[data-op]");
const decimalKey = document.querySelector("#decimal");
const calculateKey = document.getElementById('calculate');
const deleteKey = document.getElementById('delete');

// const calculatorDisplay = document.getElementById("result-container").getElementsByTagName("p"); //(faster)
const calculatorDisplay = document.querySelector("#result-container p");

class Calculator{
    constructor(){
        this.savedOperand = this.currentOperand = this.operation = null;
        this.newCalculation = true;
        this.operators = Object.freeze({
            ADD: '+',
            SUBTRACT: '-',
            MULTIPLY: '×',
            DIVIDE: '÷',
            DECIMAL: '.'
        })
    }

    clearOperands(){
        this.savedOperand = this.currentOperand = this.operation = null;
    }

    appendNumber(number){
        if (this.currentOperand == null || this.newCalculation){
            this.currentOperand = number;
            this.newCalculation = false;
        }else {
            this.currentOperand = this.currentOperand.concat(number);
        }
    }

    enterOperation(operation){
        if (this.savedOperand == null){
            /*
            save the current operand and registers the new one
            */
            this.savedOperand = this.currentOperand;
            this.currentOperand = null
            this.operation = operation;
        }
        else{
            /*
            if the two operand slots are filled, compute the calculation and take the new operand
            */
            this.savedOperand = String(this.calculate());
            this.currentOperand = null;
            this.operation = operation;
        }  
    }

    calculate(){
        if (!(this.currentOperand == null && this.savedOperand == null && this.operation != null))
        {
            switch(this.operation)
            {
                case this.operators.ADD:
                    return Number(this.currentOperand) + Number(this.savedOperand);
                case this.operators.SUBTRACT:
                    return Number(this.savedOperand) - Number(this.currentOperand);
                case this.operators.MULTIPLY:
                    return Number(this.currentOperand) * Number(this.savedOperand);
                case this.operators.DIVIDE:
                    return Number(this.savedOperand) / Number(this.currentOperand);
                default:
                    throw new Error("Unknown operator");
            }
        }
    }

    updateOutput(){
        myCalculator.currentOperand = myCalculator.calculate();
        myCalculator.savedOperand = null;
        /*
        prevents the user from appending digits to the calculated result,
        if the user chooses an operation and enters a new digit, this will be set
        to false so that additional digits can be appended to the current one
        */
        myCalculator.newCalculation = true; 
    }

    addDecimal(){
        if (this.currentOperand.includes(this.operators.DECIMAL))
            return;
        else {
            this.currentOperand += "."
        }
    }
}

function debug(calculator){
    console.log("saved op: " + calculator.savedOperand);
    console.log("current op: " + calculator.currentOperand);
    console.log("operation: " + calculator.operation);
    console.log("new calculation?: " + calculator.newCalculation);
    console.log("");
}

const myCalculator = new Calculator();
// forEach works with querySelectorAll
numberKeys.forEach(key => {
    //compared to 'onclick', addEventListener allows multiple events for a single element
    key.addEventListener('click', ()=>{
        myCalculator.appendNumber(key.innerText);
        calculatorDisplay.innerText = myCalculator.currentOperand;
        debug(myCalculator);
    })
})

operationKeys.forEach(key => {
    key.addEventListener('click', ()=>{
        let operation = key.dataset.op
        myCalculator.enterOperation(operation);
        calculatorDisplay.innerText = myCalculator.savedOperand;
        debug(myCalculator);
    })
})

calculateKey.addEventListener('click', () => {
    if (myCalculator.savedOperand || 
        myCalculator.currentOperand|| 
        myCalculator.operation){
        myCalculator.updateOutput();
        calculatorDisplay.innerText = myCalculator.currentOperand;
    }
    debug(myCalculator);
})

deleteKey.addEventListener('click', () => {
    myCalculator.clearOperands();
    calculatorDisplay.innerText = 0;
})

decimalKey.addEventListener('click', () => {
    myCalculator.addDecimal();
    if (!calculatorDisplay.innerText.includes(myCalculator.operators.DECIMAL)){
        calculatorDisplay.innerText += "."
    }
})