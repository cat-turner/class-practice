# Post Requests

## Creating new blocks

We want to have the ability to add blocks. We do this in the 
following way

i. add a new form
ii. create POST route

Once we add the name of the block,  and submit, we should
see that block added to our list. Then click on link,
and it should take us to the description of the block

### How this is done

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

