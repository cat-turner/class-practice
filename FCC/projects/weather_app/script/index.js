/* global $*/
/* global navigator*/
/* global google*/
/* global WEATHER_API_KEY*/
/* global Math */
/* global cloudCover */
/* global windSpeedUnit */
/* global windDegtoDir */
/* global parseData */

//https://jsfiddle.net/api/post/library/pure/
// https://openweathermap.org/weather-data

var units = "imperial";

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


class WeatherData {
    constructor(geoLocation){
        this.lat = geoLocation.lat;
        this.lon = geoLocation.lon;
        this.baseURL = "https://api.openweathermap.org/data/2.5/";
        this.API_KEY = WEATHER_API_KEY;
        this.localWeather = ''
    }
    
    getCurrentData(){
        var url = this.baseURL + 'weather?'
        
        CallAjax(url, {
            "appid": this.API_KEY,
            "lat":this.lat,
            "lon":this.lon,
            "units": units
        }, this.weatherCard);

        
    }
    
    
    weatherCard(data){
        var weather = parseData(data, units);
         var card = document.createElement("div");
         card.setAttribute("class", "card-style");
         var header = document.createElement("div");
         
         
         
        
    }
    

    
}

class App {
    constructor(){
        this.currentWeather = '';
        
        // initialize values
        this.weatherCurrentLoc()
        
    }
    
    weatherCurrentLoc(){
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position){
        var geoLocation = {
            lat:position.coords.latitude,
            lon:position.coords.longitude
        };

        var w = new WeatherData(geoLocation);
        that.currentWeather = w.getCurrentData();


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

