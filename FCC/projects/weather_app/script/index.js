/* global $*/
/* global navigator*/
/* global google*/
/* global WEATHER_API_KEY*/
/* global Math */
/* global getWeatherIcon */
/* global parseData */

//https://jsfiddle.net/api/post/library/pure/
// https://openweathermap.org/weather-data

var units = "metric";

function addradioButton(unit){
        var input = document.createElement("INPUT");
        input.setAttribute("type","radio");
        input.setAttribute("name", "unit"); //same name so only 1 can be selected
        input.setAttribute("value", `${unit}`);
        input.onchange=changeEventHandler;
        input.setAttribute("class", "mdl-radio__button")
        return input;
        
    }

function makeContent(contentDiv, data){
        var items = document.createElement("UL");
        items.innerHTML = `<h3>${data.city}</h3>`
        items.innerHTML += `<span class="weather-desc-second">${data.description}</span>`;
        data.weather.forEach(function(item){
            var entry = document.createElement("LI");
            entry.innerHTML = item;
            entry.setAttribute("class", "mdl-list weather-desc")
            items.appendChild(entry);
            
        });
        contentDiv.appendChild(items);
        contentDiv.innerHTML += data.icon;
        return contentDiv;
        
}

function CallAjax(url, parameters, successCallback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: parameters,
        dataType: 'json',
        success: successCallback,
        error: function(xhr, textStatus, errorThrown) {
            console.log('error');
            }
        });
    }

class WeatherCards {
    constructor(){
        this.baseURL = "https://api.openweathermap.org/data/2.5/";
        this.API_KEY = WEATHER_API_KEY;
        this.cards = []
    }
    
    rerenderContent(data){
        data = parseData(data, units);
        var cardsDiv = document.getElementById("Card-" + data.city)
        var contentDiv = document.getElementById(data.city);
        cardsDiv.removeChild(contentDiv);
        contentDiv = document.createElement("DIV");
        contentDiv.id = data.city;
        contentDiv = makeContent(contentDiv, data);
        cardsDiv.prepend(contentDiv);
    }
    

    
    makeLocCard(data){
        //units selected here will define everything else
        var cardsDiv = document.createElement("DIV");
        cardsDiv.setAttribute("class", "mdl-card mdl-shadow--2dp wide-card");
        data = parseData(data, units);
        var contentDiv = document.createElement("DIV");
        contentDiv.id = data.city;
        cardsDiv.id = 'Card-' + data.city;

        contentDiv = makeContent(contentDiv, data);
        cardsDiv.appendChild(contentDiv);
        var actionsDiv = document.createElement("DIV");
        actionsDiv.setAttribute("class", "mdl-card__actions mdl-card--border");
        actionsDiv.innerHTML = "units: ";
        
        var form = document.createElement("FORM");
        var input = addradioButton("imperial");
        input.checked = true;
        var radioLbl = document.createElement("LABEL");
        radioLbl.innerHTML = "imperial";
        radioLbl.setAttribute("class", "demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect")
        form.appendChild(input);
        form.appendChild(radioLbl);

        input = addradioButton("metric");
        radioLbl = document.createElement("LABEL");
        radioLbl.innerHTML = "metric";
        radioLbl.setAttribute("class", "demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect")
        form.appendChild(input);
        form.appendChild(radioLbl);
        actionsDiv.appendChild(form);
        cardsDiv.appendChild(actionsDiv);

        var app = document.getElementById("app-content")
        app.appendChild(cardsDiv);
        return cardsDiv.id;
    }
    

    
    showCurrentData(lat, lon){
        var url = this.baseURL + 'weather?'
        this.lat = lat;
        this.lon = lon;
        // get parent element
        //
        
        CallAjax(url, {
            "appid": this.API_KEY,
            "lat":this.lat,
            "lon":this.lon,
            "units": units
        }, this.makeLocCard);

        
    }
    
    rerender(lat, lon){
        var url = this.baseURL + 'weather?'
        this.lat = lat;
        this.lon = lon;
        // get parent element
        //
        
        CallAjax(url, {
            "appid": this.API_KEY,
            "lat":this.lat,
            "lon":this.lon,
            "units": units
        }, this.rerenderContent);

        
    }

    

    
}

class App {
    constructor(){
        this.cards = new WeatherCards();
        
        // initialize values
        this.weatherCurrentLoc()
        
    }
    
    weatherCurrentLoc(){
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position){
        that.cards.showCurrentData(position.coords.latitude, position.coords.longitude);

        }, function(error){
            console.log('location not found');
            return ''
            
        });
    }
    rerender(){
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position){
        that.cards.rerender(position.coords.latitude, position.coords.longitude);

        }, function(error){
            console.log('location not found');
            return ''
            
        });
    }
    
    
}


var app = new App();

function changeEventHandler(event) {
    var unit = event.target.value;
    console.log(unit);
    // change global value
    units = unit;
    app.rerender();
    
}

