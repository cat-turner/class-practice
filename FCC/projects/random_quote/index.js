/*global Headers*/
/*global Request*/
/*global fetch*/


// read the forms to get the user inputs for
// -category
// - quote source
class formReader {
    constructor(categoryDivId){
        this.catDivId = categoryDivId;
    }
    
    getCategory(){
        return document.getElementById(this.catDivId).value;
    }

}


function injectQuote(){
    var quoteBox = document.getElementById("quoteBox");
    quoteBox.textContent = quote.getQuote();
    
    
}

var data = ''

class QuoteGrabber {
    constructor(){
        /* set up the header */
/* PUT KEYS HERE */
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'text/plain');
        myHeaders.append('X-Mashape-Key', 'k9OYUtOdtOmsh1YJfhpPXrade2cqp1G9j9ujsnCc9EuxJNlyUg');
        myHeaders.append('Authorization',"Token token=yd8WzkWNEEzGtqMSgiZBrwtt");
        this.url ='https://juanroldan1989-moviequotes-v1.p.mashape.com/api/v1/quotes';
        this.myInit = { 
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        }
        
    }
    

/*
    getQuote(parameter, searchTerm){
        var q = this.querySetup(parameter, searchTerm);
        
        var myRequest = new Request(q, this.myInit)
        console.log(Request);
        var result = fetch(myRequest)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // Read the response as json.
            return response.json();
            
        })
        .then(function(responseAsJson){
            var result = responseAsJson;
            data = result;
            return result;
            
        })
        .catch(function(error) {
            console.log('Error with request:', error);
        });
        */
        //console.log(result);
        /*
        result.then(function(defs){
            return defs;
            
        });*/
        //return this.getRandom(result);
        
        
    //}

    querySetup(parameter, input){
    input = input.replace(" ", "+");
    return `${this.url}?${parameter}=${input}`;
    }
    
    getRandom(result){
        /* picks a number between that range*/
        var nQuotes = result.length;
        var idx = Math.floor(Math.random() * nQuotes);
        return result[idx]
    }

    getQuotes(parameter, searchTerm) {
        var q = this.querySetup(parameter, searchTerm);
        var myRequest = new Request(q, this.myInit)
        if (this._data) return this._data;
        this._data = fetch(myRequest)
                          .then(resp => resp.json());
        return this._data;
    }
    
    getRandomQuote(parameter, searchTerm){
        var quotes = [];
        this.getQuotes(parameter, searchTerm).then(d => quotes.push(d));
        console.log("quotes");
        var result = Promise.resolve(quotes)
        
        console.log(result);
        console.log("quotes.length");
        console.log(quotes.length);
        console.log("quotes[0]");
        console.log(quotes[0]);
        var quote_data = quotes[0];
        console.log("---");
        
        console.log(quotes);
        console.log("end");
    }
    
}

var quote = new QuoteGrabber();
var quotes = []
quote.getQuotes('actor','will ferrell').then(d => quotes.push(d))

//console.log("---");
//console.log(quotes);

quote.getRandomQuote('actor','will ferrell')


/*
var myHeaders = new Headers();
myHeaders.append('Accept', 'text/plain')
myHeaders.append('X-Mashape-Key', 'k9OYUtOdtOmsh1YJfhpPXrade2cqp1G9j9ujsnCc9EuxJNlyUg')
myHeaders.append('Authorization',"Token token=yd8WzkWNEEzGtqMSgiZBrwtt")

var myInit = { 
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};


function querySetup(parameter, input){
    var output = input.replace(" ", "+");
    return 
}


console.log(myHeaders.get('Accept'))

var myRequest = new Request('https://juanroldan1989-moviequotes-v1.p.mashape.com/api/v1/quotes?movie=kill+bill', myInit);

var result = fetch(myRequest)
.then(function(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
})
.then(function(responseAsJson){
    console.log(responseAsJson);
    
})
.catch(function(error) {
    console.log('Error with request:', error);
});

console.log(result);
*/

