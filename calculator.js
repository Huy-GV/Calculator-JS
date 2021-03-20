"use strict"
const numberKeys = document.querySelectorAll('.number');
const operationKeys = document.querySelectorAll('.operation');
const calculateKey = document.querySelector('#calculate');
const deleteKey = document.querySelector('#delete');
const calculatorDisplay = document.querySelector("#result-container").querySelector("p");
class Calculator{
    constructor(){
        this.savedValue = this.currentValue = this.operation = null;
        this.newCalculation = true;

    }

    delete(){
        this.savedValue = this.currentValue = this.operation = null;
    }

    appendNumber(number){
        if (this.currentValue == null || this.newCalculation){
            this.currentValue = number;
            this.newCalculation = false;
        }else {
            this.currentValue = this.currentValue.concat(number);
        }
    }

    chooseOperation(operation){
        if (this.savedValue == null){
            //push the current value to the previous one
            //make the current one empty
            //display the previous one
            this.savedValue = this.currentValue;
            this.currentValue = null
            this.operation = operation;
        }
        else{
            //cannot push the current value, so calculate the previous operation
            //the previous value will be the result, while the current value will be null
            this.savedValue = this.calculate();
            this.currentValue = null;
            this.operation = operation;
        }  
    }

    calculate(){
        if (!(this.currentValue == null && this.savedValue == null && this.operation != null))
        {
            switch(this.operation)
            {
                case "+":
                    return String(Number(this.currentValue) + Number(this.savedValue));
                case "-":
                    return String(Number(this.savedValue) - Number(this.currentValue));
                case "x":
                    return String(Number(this.currentValue) * Number(this.savedValue));
                case "%":
                    return String(Number(this.savedValue) / Number(this.currentValue));
                default:
                    return;
            }
            
        }
    }


    debug(){
        console.log("first val: "+this.savedValue);
        console.log("sec val: "+this.currentValue);
    }
}

const calculator = new Calculator();


//assigning the number to currentValue
numberKeys.forEach(key => {
    key.addEventListener('click', ()=>{
        calculator.appendNumber(key.innerText);
        calculatorDisplay.innerText = calculator.currentValue;
        calculator.debug();
    })
})

operationKeys.forEach(key => {
    key.addEventListener('click', ()=>{
        console.log(key.innerHTML);
        calculator.chooseOperation(key.innerHTML);
        calculatorDisplay.innerText = calculator.savedValue;

        calculator.debug();
    })
})

calculateKey.addEventListener('click', () => {
    if (!(calculator.savedValue == null || calculator.currentValue == null || calculator.operation == null)){
        calculatorDisplay.innerText = calculator.currentValue = calculator.calculate();
        calculator.savedValue = null;
        calculator.newCalculation = true;
    }
    calculator.debug();
})

deleteKey.addEventListener('click', () => {
    calculator.delete();
    calculatorDisplay.innerText = null;
})