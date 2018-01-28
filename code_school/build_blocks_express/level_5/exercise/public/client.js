/*global $*/

$(function(){
    // perform a get request to cities route to populate drop down list
    $.get('/cities', appendToList);
    
    // function to append items to ul
    function appendToList(cities){
        var list = [];
        
        for (var i in cities){
            var city = cities[i];
            var content = '<a href="#" data-city=' + city + '"><i class="fas fa-minus-square"></i></a>';
            content += '<a href="/cities/' + city + '" class="items">' + city + '</a>'; 
            list.push($('<li>', { html:content }));
        }
        $('.city-list').append(list);
    }

    // submit post request to server side when you click submit button
    $('form').on('submit', function(event){
        event.preventDefault();
        var form = $(this);
        var cityData = form.serialize();
        $.ajax({
            type: 'POST',
            url:'/cities',
            data:cityData
        }).done(function(cityName){
            appendToList([cityName]);
            form.trigger('reset');
            
        });
        
    });
    
    // delete the city item when you click the icon

    $('.city-list').on('click', 'a[data-city]',function(event){

        if (!confirm('Are you sure?')){
            return false;
        }
        
        var target = $(event.currentTarget);
        
        $.ajax({
            type: 'DELETE',
            url: '/cities/' + target.data('city')
        }).done(function(){
            target.parents('li').remove();
        });
    
    });

    
    
    
    
});