# Post Requests

What you will learn in this section:

Part 1. POST Requests

i. Create routes for posts and delete requests
ii. Use body parser middleware to read form submitted data
iii. Generate responses with the http status code

Part 2. DELETE Requests
i. add delete links
ii. create delete route
iii. Should persist on the server, if refresh the page we should see block
is no longer there

# Part 1.

## Create routes for posts and delete requests

We want to have the ability to add blocks. We do this in the 
following way

i. add a new form
ii. create POST route

Once we add the name of the block,  and submit, we should
see that block added to our list. Then click on link,
and it should take us to the description of the block

### How it works (concept)

i. We send a POST request to /blocks
```
name = "Flying"
description = "able to move through the air"

```
ii. The server's response:

Response will be a 201 created status code
which is 
```
201 Created status code
flying
```

returns proper status code and a new Block name
as the response body

### Client side code - Let's work on client side: getting the data from the user's input

1. Have the basic skelatal structure of you code, ie require express,
which you can bring from the previous level.


2. Create an ajax call. 

```
    $('from').on('submit', function(event){
        var form = $(this);
        var blockData = form.serialize();
        
        $.ajax({type: 'POST', url:'/blocks', data:blockData
        
        }).done(function(blockName){
            
        });
    });
    
```

3. Add code to handle data from the form and pass to the ajax call

i. Call jquery method preventDefault, and add it before the 
ajax call.

if this method is called, the default action of the event will
not be triggered.

```
event.preventDefault();
```

how it works:

You wrap the form object this in a jquery object.

To make the form easier to work with we call the serialize function.

ii. Add code to grab the data from the form

Serialize encodes a set of form elements as a string for submission.

Transforms the data to url encoded notation.

We declare the data from the form as blockData:

```
data:blockData
```
recently created block

And add your data to the list, call append to List in your
function where you handle the blockName

```
appendToList([blockName]);
```

we pass it as an array because we expect it to be, in the funciton.

We are doing this for code reuse.

4. Clear contents of form

then call trigger on the form object to clear the contents
of the form and get it back with the default text filled in

```
form.trigger('reset');
```

5. Add link to block information

Use a href to create the link, and append this to the block list
```
// create a link to the block description
var content = '<a href="/blocks/' + block + '">' + block + '</a>';
```

Before we only added the item to list as text. 

```
list.push($('<li>', {text:blocks[i]}));
```

Now change this item such that we are adding html
to the list.

```
list.push($('<li>', { html:content }));
```

## Use body parser middleware to read form submitted data

### Server side code - Let's use parse this data on the server side, and do something with it

Parsing depends on a middleware not shipped with express.

6. Install the body parser middleware.

```
npm install body-parser

```

7. On your server side code, require the body-parser module.

```
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});
var blocks = {...};

```

You need to use bodyParser() if you want the form data to 
be available in req.body

Calling bodyParser.urlencoded returns a middleware function, which
will be used to parse the data from the post request.

8. Create an endpoint to posting to the blocks path

```

app.post('/blocks', parseUrlencoded, function(request, response){
    
});
```

Routes can take multiple handlers as arguments. They will get executed
sequentially.

the second argument to the post route is the 
creation of the anonymous function to handle the creation of the
post block

9. read the request data

Form submitted data can be accessed through the request.body

Create a variable to grab the data

```
var newBlock = request.body;

```

Access the data from the request.body object,
and add the data to the blocks object

```
blocks[newBlock.name] = newBlock.description;

```

10. Send a 201 created status and the block's name in
the response body.

and in the response body, set the status code to 201, Created, and 
in the response body include the new block name

```
response.status(201).json(newBlock.name);

```

# Part 2. Delete Existing Blocks

## Client side code

How does this work?

i. Send an api request to the delete endpoint of the block's request
ii. Get a 200 success response 


11. Add a delete link next to each of the blocks.

You can go to your client.js file, and add an href element
that has an attribute 'data-block' equal to the block's name.

```
var content = '<a href="#" data-block=' + block + '"><i class="fas fa-minus-square"></i></a>';
content += '<a href="/blocks/' + block + '" class="items">' + block + '</a>'; 
```

12. Add event listeners to those icons

```
$('.block-list').on('click', 'a[data-block]',function(event){
//...
    

});

```

13. Add event confirmation

```
if (!confirm('Are you sure?')){
    return false;
}
```

14. Get the link element that was clicked... using the event currentTarget
```
var target = $(event.currentTarget);
```

currentTarget identifies the current target for the event, as the event
traverses the DOM. It always refers to the element to which the event 
handler has been attache

wrap it around a jquery object to make it easily available. hmm they seem
to do this a lot

Use this object to get the name of the block that is tied to the event; this is the
block that is being deleted:

```
target.data('block')
```

15. Make an ajax delete request

```
$.ajax({
    type: 'DELETE',
    url: '/blocks/' + target.data('block')
}).done(function(){

    
});

```

16. When the request is successful, update the list so
that it no longer has the deleted item.

```

target.parents('li').remove();
```

Find the parent li element to remove the node.

## Server side code

i. add the delete route
ii. Send an OK response when the item is deleted

17. Add the route to delete the item

```
app.delete('/blocks/:name', function(request, response){

    
})

```

18. Use the delete operator in javascript to remove a property from an object

```
delete blocks[request.blockName];
```

and send status, saying that everything is ok

19. Send status code

```
response.sendStatus(200);
```