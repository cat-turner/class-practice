/*global $*/

$(function(){
    $.get('/blocks', appendToList);
    
    function appendToList(blocks){
        var list = [];
        for(var i in blocks){
            var block = blocks[i];
            
            // create a link to the block description
            var content = '<a href="#" data-block=' + block + '"><i class="fas fa-minus-square"></i></a>';
            content += '<a href="/blocks/' + block + '" class="items">' + block + '</a>'; 
            list.push($('<li>', { html:content }));
        }
        $('.block-list').append(list);
    }
    
    $('form').on('submit', function(event){
        // prevents the form from being immediately subbmiteted
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();
        
        $.ajax({type: 'POST', url:'/blocks', data:blockData
        
        }).done(function(blockName){
            console.log("I am done");
            appendToList([blockName]);
            form.trigger('reset');
            
        });
    });

    $('.block-list').on('click', 'a[data-block]',function(event){

        if (!confirm('Are you sure?')){
            return false;
        }
        
        var target = $(event.currentTarget);
        
        $.ajax({
            type: 'DELETE',
            url: '/blocks/' + target.data('block')
        }).done(function(){
            console.log("hi");
            target.parents('li').remove();
            
        });
        //target.parents('li').remove();
    
    });
    
});