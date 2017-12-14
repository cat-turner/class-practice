/* global $*/
/* global navigator*/
/* global google*/
/* global WEATHER_API_KEY*/
/* global Math */
/* global getWeatherIcon */
/* global parseData */

//https://jsfiddle.net/api/post/library/pure/
// https://openweathermap.org/weather-data

var units = "imperial";

function addradioButton(divobj, unit){
        var input = document.createElement("INPUT");
        input.setAttribute("type","radio");
        input.setAttribute("name", "unit"); //same name so only 1 can be selected
        input.setAttribute("value", unit);
        return input;
        
    }

function makeCard(data){
        data = parseData(data, units);
        var cardsDiv = document.createElement("DIV");
        cardsDiv.setAttribute("class", "mdl-card mdl-shadow--2dp wide-card");
        cardsDiv.id = data.city;
        var items = document.createElement("UL");
        items.innerHTML = `<h3>${data.city}</h3>`
        items.innerHTML += `<span class="weather-desc-second">${data.description}</span>`;
        data.weather.forEach(function(item){
            var entry = document.createElement("LI");
            entry.innerHTML = item;
            entry.setAttribute("class", "mdl-list weather-desc")
            items.appendChild(entry);
            
        });
        cardsDiv.appendChild(items);
        cardsDiv.innerHTML += data.icon;
        return cardsDiv;
        
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
    

    
    makeLocCard(data){
        //units selected here will define everything else
        var cardsDiv = makeCard(data);
        var actionsDiv = document.createElement("DIV");
        actionsDiv.setAttribute("class", "mdl-card__actions mdl-card--border");
        actionsDiv.innerHTML = "units: ";

        var input = addradioButton("imperial");
        input.checked = true;
        var radioLbl = document.createElement("LABEL");
        radioLbl.innerHTML = "imperial";
        actionsDiv.appendChild(input);
        actionsDiv.appendChild(radioLbl);

        input = addradioButton("metric");
        radioLbl = document.createElement("LABEL");
        radioLbl.innerHTML = "metric";
        actionsDiv.appendChild(input);
        actionsDiv.appendChild(radioLbl);
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
    
    getCityLatLon(city, state){
        //var geocoder = new google.maps.GeoCoder();
        var geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({'address': `${city},${state},us`}, function(results, status){
            if (status == 'OK'){
                console.log(results);
                
            } else{
                console.log('did not get data')
                
            }
        });
    }
    
}


var app = new App();


document.addEventListener('DOMContentLoaded',function() {
    document.querySelector("input[name='unit']").onchange=changeEventHandler;
},false);

function changeEventHandler(event) {
    // You can use “this” to refer to the selected element.

    var unit = event.target.value;
    console.log(unit);
}
