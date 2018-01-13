
class math_obj {
    constructor(value, action){
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
        this.display_string = '';
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
        this.display_string += input.getString();
        console.log('display:');
        console.log(this.display_string);
    }
    
    displayTotal(total){
        console.log('total:')
        console.log(total);
    }
    
    clearEverything(){
        this.calculator_inputs = [];
        this.start_value = 0;
        
    }
    
    demo(){
        var inputs = [[1,'+'], [2,'+'], [3,'+'],[4,'+'],[11,'-'],[-1,'/'],[10.5,'*'],['','=']];
        this.appendInput('', '');
        var that = this;
        // you have to do this bc you are in the scope of foreach
        inputs.forEach(function(input){
            if (input[1]=='='){
                var total = that.calculateInputs();
                that.displayTotal(total);
                // clear your inputs
                that.clearEverything();
                if(input[0]){
                    that.start_value = input[0];
                }else{
                    that.start_value = total;
                }
            }else{
                var match_obj = that.appendInput(input[0], input[1]);
                that.displayInputs(match_obj);
                
            }
        });

        
    }
    
    
}

var calc1 = new Calculator();
console.log(calc1);
calc1.demo();
console.log(calc1.start_value);

// to do next
/*add event listener to buttons*,
such that when you press on the button, it
1) appears on console
2) is stored in app
3) it is displayed in the calcu/

*/

function storeNumberInput()



document.getElementByClass("number-btn").forEach(function(e){
    element.addEventListener('click', storeNumberInput(e));
    
    
})





