
function cloudCover(perc){

    if (perc <= 5){
        return "clear";
    }else if (perc > 5 && perc <= 50){
        return "partly cloudy";
    }else if (perc > 50 && perc <= 95){
        return "mostly cloudy";
    }else {
        return "overcast"
    }

}

function windSpeedUnit(units){
    if(units == "imperial"){
        return 'm/s';
    }else{
        return 'mph';
    }
}

function windDegtoDir(dirDeg){
    var  sector = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
    var index = dirDeg % 360;
    index = Math.round(index/ 22.5,0)+1;
    return sector[index];
    
}


function parseData(data, units){
        
        var weather = {
            type: data.weather[0].main,
            description: data.weather[0].description,
            icon: getWeatherIcon(data.weather[0].id),
            direction: windDegtoDir(data.wind.deg),
            speed: data.wind.speed + ' ' + windSpeedUnit(units),
            cloudcover: cloudCover(data.clouds.all),
            temp: data.main.temp,
            humid: data.main.humidity,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            city: data.name
            
            
        }
        console.log(weather);
        return weather;
        
}

// http://openweathermap.org/weather-conditions
//https://material.io/icons

/*
<i class="material-icons">wb_sunny</i>
                        <i class="material-icons">grain</i>
                        <i class="material-icons">cloud_queue</i>
                        <i class="material-icons">cloud</i>
                        <i class="material-icons">filter_drama</i>
                        <i class="material-icons">wb_sunny</i>
                        <i class="material-icons">ac_unit</i>
                        <i class="material-icons">brightness_1</i>
                        <i class="fa fa-moon-o" aria-hidden="true"></i>
                        <i class="fa fa-bolt" aria-hidden="true"></i>
*/

function getWeatherIcon(code){
    var codeStr = code.toString();
    
    if (codeStr[0] == '2'){
        return '<i class="fa fa-bolt icon-sz" aria-hidden="true"></i>';
        
    }else if (codeStr[0] == '3' || codeStr[0] == '5'){
        return '<i class="material-icons icon-sz">grain</i>';
    }else if (codeStr[0] == '6'){
        return '<i class="material-icons icon-sz">ac_unit</i>';
    }else if (codeStr[0] == '7'){
        return '<i class="material-icons icon-sz">blur_on</i>';

    }else if (codeStr == '800'){
        var d = new Date();
        var hr = d.getHours();
        if (hr > 18){
            return '<i class="fa fa-moon-o icon-sz" aria-hidden="true"></i>';
            
        }else{
            return '<i class="material-icons icon-sz">wb_sunny</i>';
            
        }
    }else if ( codeStr[0] == '8'){
        return '<i class="material-icons icon-sz">filter_drama</i>';
        
    }else if (codeStr.substring(0,1) == '90'){
        // extreme
        return '<i class="material-icons icon-sz">warning</i>';
    }else{
        return '<i class="fa fa-sun-o icon-sz" aria-hidden="true"></i>';
    }
    
}