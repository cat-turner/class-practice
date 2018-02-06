# 1 Ramp u

- responsive website
- works with jquery
- easy to test

Non responsive

client makes request
web server sends page
page loaded on client side
user fills form/data
makes request to server side
server sends page
page is reloaded on client side


responsive

client makes request
web server sends page
page loaded on client side
user fills form/data
makes request to server side
server sends json data
data is loaded to existing page


APIs

Apis help apps talk to a data source
- browser
- mobile app
- developers


Angular is on the front end
Angular will talk to the back end


## What is AngularJS

A client-side js framework for adding interactivity to
html


How to tell html to trigger js

how does it work.

angular uses directives - a marker on html that tells angular to run js code

The application we will build will be a store.

Each item will have picture, data, and even a form.

How to set up?

### Source

1. Download files

i. download angular js
ii. download bootstrap


### MOdules

What we use to encapsulate our code. Makes it readable.
Makes it maintainable
We define the app dependancies.

2. Define your module in your app.js file

(app.js)
```
var app = angular.module('store', []);
````
angular - angularJS
store - application name
[] - dependancies; other libraries we may need

include the refrence in your html file

```
<script type="text/javascript" src="app.js"></script>
```

3. Add an attribute to your html tag


```
<html ng-app="store">
```
ng-app is a directive. This is directive is what creates
an angular application by running this module when the document
loads.

It's going to treat the html inside of the element as the
angular app. This is very important! Without it, no angular
app.


4. Let's insert dynamic values into our html using expressions


### Expressions

Allow you to insert dynamic values in your html.
This can be done in the following ways:

#### Numerical Operations
WHen you add two values
```
<p>
I am {{1+1}}
</p>

```

you will see it as 2

#### String Operations

```
<p>
{{"hello" + " you"}}
</p>

```

which you will see "hello you" when you preview your html


Let's add data onto the page using controllers.

(app.js)
```
var gem = {
    name: 'ruby',
    price: 3,
    description: 'pretty'
}


```

#### Controllers

Allow us to define out apps behavior by defining functions
and values


5. Let's wrap our entire application in an enclosure. We
do this out of good habit

```
(function(){
    var app = angular.module('store', []);
    
})();


```
6. Create the controller. This should be inside your app.

```
app.controller('StoreController', function(){
    
});

```
7. move your gem variable into your app.js

8. set this gem equal to a property of this controller

```
this.product = gem
```

product is a property of our controller.

Now to get access to this data in your html page

9. Let's use a template to define where we want the data
to load onto the page

```

<body>
    <div>
        <h1>Product Name </h1>
        <h2> $Product Price </h2>
        <p> Product Description </p>
    </div>
....

```

10. Add your ng controller directive to the html page/
This allows us to attatch our controller to this element

```
    <div ng-controller="StoreController as store">
        <h1>Product Name </h1>
        ....
    </div>

```
StoreController : controller name
as: a keyword
store: the alias we are using for this store controller
which we wil use inside our expressions.

11. Change your template to actually include angular data

from this:
```
        <h1>Product Name </h1>
        <h2> $Product Price </h2>
        <p> Product Description </p>


```

to this:

```
        <h1>{{store.product.name}}</h1>
        <h2>${{store.product.price}}</h2>
        <p> {{store.product.description}}</p>
```
you can only access this data inside that div, the dom element!


## Built-in Directives

12. Hide elements of the page using built in directives.
He we can hide a button

```
<button ng-show="store.product.canPurchase"> Add to Cart</button>
```
in our gem, we can set canPurchase to false. This hides the button.

If you set it to true, this reveals the button.

We can even hide the product, if sold out.

(app.js)
```
    var gem = {
        name: 'ruby',
        price: 3,
        description: 'pretty',
        canPurchase:true,
        soldOut: true
    }
```

(html)

```
  <body ng-controller="StoreController as store">
    <div ng-hide="store.product.soldOut">
        <h1>{{store.product.name}}</h1>
        <h2>${{store.product.price}}</h2>
        <p> {{store.product.description}}</p>
        <button ng-show="store.product.canPurchase"> Add to Cart</button>
    </div>
  </body>
```

and to iterate through an array, and create multiple,
use a for loop

```

  <body ng-controller="StoreController as store">
    <div ng-repeat="product in store.products">
        <h1>{{store.product.name}}</h1>
        <h2>${{store.product.price}}</h2>
        <p> {{store.product.description}}</p>
        <button ng-show="store.product.canPurchase"> Add to Cart</button>
    </div>
  </body>
```

and change product to products

```
this.products = gems;
```










