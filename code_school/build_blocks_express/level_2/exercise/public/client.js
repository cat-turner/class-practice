/*global $*/

$(function(){
    // perform a get request to blocks route, and pass
    // in returned object to appendToList
    $.get('/cities', appendToForm);
    
    function appendToForm(cities){
        var selection = document.getElementById("city-list");
        
        for (var i in cities){
            var city = cities[i];
            var x = document.createElement("OPTION");
            x.setAttribute("value", city);
            var text = document.createTextNode(city);
            x.appendChild(text)
            selection.appendChild(x);
        }
    }
    
    
});