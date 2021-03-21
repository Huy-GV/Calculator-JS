"use strict"
const numberKeys = document.querySelectorAll('.number');
const operationKeys = document.querySelectorAll('.operation');
const calculateKey = document.querySelector('#calculate');
const deleteKey = document.querySelector('#delete');
const calculatorDisplay = document.querySelector("#result-container").querySelector("p");


class Calculator{
    constructor(){
        this.savedOperand = this.currentOperand = this.operation = null;
        this.newCalculation = true;
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
            push the current operand to the previous one
            make the current one empty
            */
            this.savedOperand = this.currentOperand;
            this.currentOperand = null
            this.operation = operation;
        }
        else{
            /*
            cannot push the current operand to the saved one, so calculate the existing operands,
            the result of that calculation will be saved to savedOperand, while the current operand will be made null and used to accommodate new inputs
            */
            this.savedOperand = this.calculate();
            this.currentOperand = null;
            this.operation = operation;
        }  
    }

    calculate(){
        if (!(this.currentOperand == null && this.savedOperand == null && this.operation != null))
        {
            switch(this.operation)
            {
                case "+":
                    return String(Number(this.currentOperand) + Number(this.savedOperand));
                case "-":
                    return String(Number(this.savedOperand) - Number(this.currentOperand));
                case "×":
                    return String(Number(this.currentOperand) * Number(this.savedOperand));
                case "÷":
                    return String(Number(this.savedOperand) / Number(this.currentOperand));
                default:
                    return;
            }
        }
    }

    updateOutput(){
        myCalculator.currentOperand = myCalculator.calculate();
        myCalculator.savedOperand = null;
        /*
        prevent the user from adding digits to the calculated result,
        if the user chooses an operation and inputs a new digit, this will be set
        to false so that additional digits can be appended to the current one
        */
        myCalculator.newCalculation = true; 
    }

    debug(){
        console.log("first op: "+ this.savedOperand);
        console.log("sec op: "+ this.currentOperand);
        console.log("operation: "+ this.operation);
        console.log("new calculation: "+ this.newCalculation);
    }
}

const myCalculator = new Calculator();
numberKeys.forEach(key => {
    //compared to 'onclick', addEventListener allows multiple events for a single element
    key.addEventListener('click', ()=>{
        myCalculator.appendNumber(key.innerText);
        calculatorDisplay.innerText = myCalculator.currentOperand;
        myCalculator.debug();
    })
})

operationKeys.forEach(key => {
    key.addEventListener('click', ()=>{
        myCalculator.enterOperation(key.innerHTML);
        calculatorDisplay.innerText = myCalculator.savedOperand;
        myCalculator.debug();
    })
})

calculateKey.addEventListener('click', () => {
    if (!(myCalculator.savedOperand == null || myCalculator.currentOperand == null || myCalculator.operation == null)){
        myCalculator.updateOutput();
        calculatorDisplay.innerText = myCalculator.currentOperand;
    }
    myCalculator.debug();
})

deleteKey.addEventListener('click', () => {
    myCalculator.clearOperands();
    calculatorDisplay.innerText = null;
})
