
var unitsKey = {
    metric:{
        wind:'m/s',
        temp:'°C'
    },
    
    imperial:{
        wind:'mph',
        temp:'°F'
        
    }
}

function windDegtoDir(dirDeg){
    var  sector = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
    var index = dirDeg % 360;
    index = Math.round(index/ 22.5,0)+1;
    return sector[index];
    
}


function parseData(data, units){
        return {
            weather: [
                `temp: ${data.main.temp} ${unitsKey[units].temp}`,
                `low: ${data.main.temp_min} ${unitsKey[units].temp}`,
                `high: ${data.main.temp_max} ${unitsKey[units].temp}`,
                `wind: ${data.wind.speed} ${unitsKey[units].wind} ${windDegtoDir(data.wind.deg)}`,
                `humidity: ${data.main.humidity + ' %'}`,
                
            ],
            city: data.name,
            description: data.weather[0].description,
            icon: getWeatherIcon(data.weather[0].id),
    
        }
            
    }

// http://openweathermap.org/weather-conditions
//TODO - use better icons, overall make this better,

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