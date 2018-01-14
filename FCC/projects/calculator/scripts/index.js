
class math_obj {
    constructor(value, action){
        if (!value && action=='-'){
            value = -1;
            action = '*';
        }else if (!value){
            return;
        }
        this.value = value;
        this.action = action;
    }
    
    getString(){
        // creates the string to display something
        return ` ${this.value} ${this.action} `;
    }
    
    addVals(input){
        return input + this.value;
    }
    
    subtractVals(input){
        return input - this.value;
    }
    
    multVals(input){
        return input * this.value;
    }
    
    divideVals(input){
        return input / this.value;
    }
    
    getResult(input){
        var action = this.action;
        switch(action){
            case '+':
                return this.addVals(input);
            case '-':
                return this.subtractVals(input);
            case '*':
                return this.multVals(input);
            case '/':
                return this.divideVals(input)
            default:
                return input;
        }
    }
}

class Calculator {
    constructor(PEMDAS = false){
        this.is_PEMAS = PEMDAS;
        this.calculator_inputs = [];
        this.start_value = 0;

        //holds the string for display
        this.display_string = '';
        
        // holds the data, without math symbols
        this.tempStorage = '';
    }

    appendInput(value, action){
        var input_item = new math_obj(value, action);
        this.calculator_inputs.push(input_item);
        return input_item;
        
    }
    
    calculateInputs(){
        var total = this.start_value;
        var inputs = this.calculator_inputs;
        inputs.forEach(function(input){
            total = input.getResult(total);
        });
        
        return total;
    }
    
    displayInputs(input){
        //takes the data stored in calculate inputs, and 
        //renders the image
        //this.display_string += input.getString();
        console.log('display:');
        console.log(this.display_string);
    }
    
    displayTotal(input){
        console.log('Total:');
        console.log(input);
    }
    
    clearEverything(){
        this.calculator_inputs = [];
        this.start_value = 0;
        
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
        
        console.log(this.calculator_inputs);
        
    }
    
    
}

var calc1 = new Calculator();
//console.log(calc1);
//calc1.demo();
//console.log(calc1.start_value);

// to do next
/*add event listener to buttons*,
such that when you press on the button, it
1) appears on console
2) is stored in app
3) it is displayed in the calcu/

*/

function storeNumberInput(e){
    var value = e.innerText;
    console.log(value);
}



function clickNumber(element){
    //console.log(element.innerText);
    calc1.buttonInput(element.innerText, "number");
}

function clickMath(element){
    //console.log(element.innerText);
    calc1.buttonInput(element.innerText, "math");
}

function clickClear(element){
    console.log("clear");
    calc1.display_string = '';
}

function clickClearEverything(element){
    console.log("clear everything");
    calc1.clearEverything();
    calc1.start_value = 0;
}

function clickEqual(element){
    console.log(calc1.tempStorage);
    var total = calc1.calculateInputs();
    calc1.displayTotal(total);
    // clear your inputs
    calc1.clearEverything();
    calc1.start_value = total;
}

