
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
    
    setPEMDAS(){
        if (!this.is_PEMDAS){
            this.is_PEMDAS = true;
        } else {
            this.is_PEMDAS = false;
        }
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
        
        if (!this.is_PEMDAS){
            var inputs = this.calculator_inputs;
            for (var i = 0; i < inputs.length - 1; i++){
                var total = inputs[i].getResult(inputs[i+1].value);
                inputs[i+1].value = parseFloat(total);
            }
            
            return total;
        } else {
            // sort entries in order of PEMDAS
            var pemdasOrder= ['*','/','+','-',''];
            var skip = []
            var calcInputsSorted = [];
            var inputs = this.calculator_inputs;
            for (var i = 0; i < pemdasOrder.length; i++){
                var operation = pemdasOrder[i];
                for (var j = 0; j < inputs.length; j++){
                    if (inputs[j].action === operation && !skip.includes(j) && inputs[j].value){
                        var input1 = new math_obj(inputs[j].value, inputs[j].action);
                        var input2 = new math_obj(inputs[j+1].value, inputs[j+1].action);
                        if (!input1.action){
                            input1.action = '+';
                        }
                        if (!input2.action){
                            input2.action = '+';
                        }
                        calcInputsSorted.push(input1);
                        calcInputsSorted.push(input2);
                        skip.push(j);
                        skip.push(j+1);
                        
                        
                    }
                }
            }
            console.log("look");
            console.log(calcInputsSorted);
            for (var i = 0; i < calcInputsSorted.length - 1; i++){
                var total = calcInputsSorted[i].getResult(calcInputsSorted[i+1].value);
                calcInputsSorted[i+1].value = parseFloat(total);
            }
            
            return total;
            
        }
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

function setPemdasMode(){
    var btn = document.getElementById("pemdas-mode");
    calc1.setPEMDAS();
    if (calc1.PEMDAS){
        calc1.style.color="lightblue";
    } else {
        calc1.style.color="black";
        
    }
}
