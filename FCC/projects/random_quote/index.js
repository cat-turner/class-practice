/*global Headers*/
/*global Request*/
/*global fetch*/
/*global quoteBank*/
/*global imageBank*/


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




var quoteData = [];

class QuoteGrabber {
    constructor(){
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

    querySetup(parameter, input){
    input = input.replace(" ", "+");
    return `${this.url}?${parameter}=${input}`;
    }
    
    getRandom(result){
        /* picks a number between that range*/
        var nQuotes = result.length;
        var idx = Math.floor(Math.random() * nQuotes);
        console.log(idx);
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
    
    getRandomQuote(){
        /*
        var quotes = [];
        this.getQuotes(parameter, searchTerm).then(d => quotes.push(d));
        console.log("quotes");*/
        return this.getRandom(quoteBank.quotes)
        
    }
    
    getRandomImage(){
        return this.getRandom(imageBank.imgs);
    }
    
}

function quoteToTweet(text){
    return encodeURIComponent(text);
    
}

var quotes = new QuoteGrabber();

function makeQuoteCard(){
    var quote = quotes.getRandomQuote();
    var image = quotes.getRandomImage();
    var UL = document.getElementById("quotes-list");
    var li = document.createElement("LI");
    li.className += "mdl-card mdl-shadow--4dp quote-bin";
    
    var mediaDiv = document.createElement("DIV");
    var img = document.createElement("IMG");
    img.style.padding="1px";
    img.setAttribute("src", image.url);
    img.setAttribute("border", 0);
    img.setAttribute("width", "300");
    img.setAttribute("height", "300");
    img.style.opacity = 0.5;
    //img.setAttribute("margin", "10");
    mediaDiv.appendChild(img);
    var quotespan = document.createElement('span')
    quotespan.innerHTML = quote.quote
    li.appendChild(mediaDiv);
    li.appendChild(quotespan)

    var anchorItem = document.createElement('A');
    anchorItem.href = `https://twitter.com/intent/tweet?text=${quoteToTweet(quote.quote)}`;
    anchorItem.innerHTML = '<i class="fa fa-twitter" aria-hidden="true"></i>';
    li.appendChild(anchorItem);
    UL.prepend(li);
    
}




