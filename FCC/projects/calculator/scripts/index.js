
class math_obj {
    constructor(value, action){
        if (!value && action=='-'){
            value = parseFloat(-1);
            action = '*';
        }else if (action && !value){
            value = 0;
        }
        this.value = parseFloat(value);
        this.action = action;
    }

    getResult(input){
        var action = this.action;
        switch(action){
            case '+':
                return this.value + input;
            case '-':
                return this.value - input;
            case '*':
                return input * this.value;
            case '/':
                return this.value / input;
            default:
                return input;
        }
    }
}

class Calculator {
    constructor(PEMDAS = false){
        this.is_PEMAS = PEMDAS;
        this.calculator_inputs = [];
        this.setStartValue(0);

        //holds the string for display
        this.display_string = '';
        
        // holds the data, without math symbols
        this.tempStorage = '';
        this.runningTotal = '';
    }

    setStartValue(value, action='+'){
        var start_value = new math_obj(value, action);
        this.calculator_inputs.push(start_value);
    }

    appendInput(value, action){
        var input_item = new math_obj(value, action);
        this.calculator_inputs.push(input_item);
        return input_item;
        
    }
    
    calculateInputs(){
        var inputs = this.calculator_inputs;
        for (var i = 0; i < inputs.length - 1; i++){
            var total = inputs[i].getResult(inputs[i+1].value);
            inputs[i+1].value = parseFloat(total);
        }
        
        return total;
        
    }
    
    cleardisplayText(){
        document.getElementById("calc-display").innerHTML = '';
    }
    displayText(){
        document.getElementById("calc-display").innerHTML = this.display_string;
    }
    
    displayInputs(input){
        this.display_string += input;
        console.log('Display:');
        console.log(this.display_string);
        this.displayText();
        
    }
    
    displayTotal(input){
        this.display_string = input;
        console.log('Total:');
        console.log(input);
        this.displayText();
    }
    
    clearEverything(){
        this.calculator_inputs = [];
        this.display_string = '';
        this.tempStorage = '';
        this.runningTotal = '';
        
    }

    buttonInput(input, type){
        if(type=="number"){
            this.tempStorage = this.tempStorage + input;
            this.displayInputs(input);
            
        }else{
            this.appendInput(this.tempStorage, input);
            this.displayInputs(input);
            this.tempStorage = '';
        }
        
    }
    
    
}

var calc1 = new Calculator();

function clickNumber(element){
    calc1.buttonInput(element.innerText, "number");
}

function clickMath(element){
    calc1.buttonInput(element.innerText, "math");
}

function clickClear(element){
    console.log("clear");
    calc1.display_string = '';
    calc1.cleardisplayText();
    // remove temp storage values
    calc1.tempStorage = calc1.runningTotal;
    calc1.calculator_inputs = [];
}

function clickClearEverything(element){
    console.log("clear everything");
    calc1.clearEverything();
    calc1.setStartValue(0);
    calc1.cleardisplayText();
}

function clickEqual(element){
    if (calc1.calculator_inputs.length != 0){
        calc1.appendInput(calc1.tempStorage, '=');
        var total = calc1.calculateInputs();
        calc1.displayTotal(total);
        // clear your inputs
        calc1.clearEverything();
        calc1.tempStorage = total;
        calc1.display_string = total;
        // this is to keep the value of running
        //total, in case they clear
        calc1.runningTotal = total;
    } else {
        return;
    }
}


