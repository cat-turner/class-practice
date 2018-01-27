/*global $*/

$(function(){
    // perform a get request to blocks route, and pass
    // in returned object to appendToList
    $.get('/blocks', appendToList);
    
    function appendToList(blocks){
        var list = [];
        for(var i in blocks){
            list.push($('<li>', {text:blocks[i]}));
        }
        $('.block-list').append(list);
    }
    
    
});