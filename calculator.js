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

    delete(){
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
            cannot push the current operand to the saved one, so calculate the previous operation,
            the result of that operation will be saved to savedOperand, while the current operand will be null and used
            to accommodate new input
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
                case "x":
                    return String(Number(this.currentOperand) * Number(this.savedOperand));
                case "%":
                    return String(Number(this.savedOperand) / Number(this.currentOperand));
                default:
                    return;
            }
        }
    }


    debug(){
        console.log("first op: "+this.savedOperand);
        console.log("sec op: "+this.currentOperand);
        console.log("operation: "+this.operation);
        console.log("new calculation: "+this.newCalculation);
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
        calculatorDisplay.innerText = myCalculator.currentOperand = myCalculator.calculate();
        myCalculator.savedOperand = null;
        myCalculator.newCalculation = true;
    }
    myCalculator.debug();
})

deleteKey.addEventListener('click', () => {
    myCalculator.delete();
    calculatorDisplay.innerText = null;
})