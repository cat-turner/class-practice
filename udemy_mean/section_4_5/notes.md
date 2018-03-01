# Introduction to Angularjs - Section 4 + 5

## Video 35 Expressions and Data Binding
- expressions
- data-binding

Angular does data binding - any model in the input will
be updated in the view

It is important you define the scope of your ng-app
because this will define how your application
will work

```
<html ng-app>
```

## VIdeo 36 - built in directives

directives attatch special behaviors to angular scopes

ex
ng-init

```
<input type="text" name="" id="" ng-model="user">
<div ng-init="number = 0">
  <button ng-click="number = number + 1">+1</button>
  <button ng-click="number = number - 1">-1</button>
  <p>{{number}}</p>
</div>



```

ng-class

to change formatting of items dynamically

```
  <div ng-init="number = 19">
    <input type="type" ng-model="guess" ng-class="{red: guess!=number,
     green: guess == number}">
    
  </div>
```

Using built-in functions in ng-repeat

```
  <div ng-init="numbers = [0,1,2,3,4,5,6,7]">
    <ul>
      <li ng-repeat="number in numbers" ng-class="{red: $even, green:$odd}">{{number}}</li>
    </ul>
    
  </div>
```

ng-options

use ng options to find a regular select element in html, and is extreamly useful for
building dynamic forms

```
  <div ng-init="rebels = [
                {name: 'Luke Skywalker', profession:'jedi', weapon: 'lifesaver'},
                {name: 'Luke Skywalker2', profession:'jedi2', weapon: 'lifesaver2'},
                {name: 'Luke Skywalker3', profession:'jedi3', weapon: 'lifesaver3'}
                ];">
  
  <select name="" id="" ng-model="rebel" ng-options="rebel.name for rebel in rebels"></select>
    <p>You have selected: {{rebel.name}} ({{rebel.profession}})</p>
  </div>
  
  <div ng-init="a = [1,2,3];">
    <select name="" id="" ng-model="a" ng-options="i for i in a"></select>
  </div>
```

to include groupings, modify your options to use group by

```
ng-options="rebel.name group by rebel.weapon for rebel in rebels"
```


- tip for hiding curly braces on load

you should move your angular import statement to the bottom, because
this should load last (and not block your page)

but the problem is that you see weird curly braces,
and things look ugly

solution:
-ng-cloak class

add this to your css class to hide curly braces
```
    .ng-cloak, [ng-cloak], [ng\:cloak] {
        display: none !important;
    }



```

and add to your body tag...
the ng-cloak directive
```
<body ng-cloak>

```

how this works: until angular expressions have finished evaluating, it will hid them


## Video 37 built in filters in angular js

- filters

ex apply it to numbers to control
number of decimal places

```
{{amount | number: 2}}
```
ex apply to letters to change case

```
{{string | uppercase}}
```

ex change a js object to human-reable date

```
{{myDate | date: 'yyyy - MMMM - d (H:m)'}}

```

ex limit the number of items from an array or object

first 4 items
```
{{myArray | limitTo: 4}}
```

last 2 items
```
{{...myArray | limitTo: -2}}
```

ex ordering by something

use minus ('-') to order by descending order

here we order by (using the jedi example) profession and decending
order of aga

```
{{ ... | orderBy: ['profession', '-age']}}
```

ex filter to filter values from your options

```
" ...| filter: 'Luke'">

```

you can use the search directive to search for items

```

you can use your input into the box to get search results
  <div ng-init="rebels = [
                {name: 'Luke Skywalker', profession:'jedi', weapon: 'lifesaver', age: 1},
                {name: 'Luke Skywalker2', profession:'jedi2', weapon: 'lifesaver2', age: 2},
                {name: 'Luke Skywalker3', profession:'jedi3', weapon: 'lifesaver3', age:3},
                {name: 'Sally Skywalker3', profession:'jedi3', weapon: 'lifesaver3', age:3}
                ];">
  
  <select name="" id="" ng-model="rebel" ng-options="rebel.name group by rebel.weapon for rebel in rebels"></select>
    <p>You have selected: {{rebel.name}} ({{rebel.profession}})</p>

  <!-- search by only the weapoon property-->
  <input type="text" ng-model="search.weapon">
  <ul>
      <li ng-repeat="rebel in rebels | filter:search">
          {{rebel.name}}
          (age:{{rebel.age}}) is a {{ rebel.profession}} fighting with a {{rebel.weapon}}
      </li>
      
  </ul>
  </div>
```


to apply the search for everything, use search with $ sign

```
    <p>Free Text Search: <input type="text" ng-model="search.$"></p>
```
    
be sure to look at documentation for built in filters

## Video 38 - Controllers -- $scope and controllerAs

you can attatch controllers to this $scope object

properties you attatch your scope will be accessible to inside
your view

you can pass in arguments to your functions and pass into your controller

you can make your code clearer by specifying which controller you
want to access your value from.

```
<div ng-controller="MyController as MyCtrl">
{{MyCtrl.name}}
</div>

```

## Video 39 - Modules

- modules


# Video 40 
- SIngle Page Apto applications
- Routes
- templates


you can assign templates and controllers to routes

group controllers that do specific things into seperate controller
files

good example of using controllers with routes

## Video 41

- built-in services
  * route params (routes that are passed in for the api calls)
  * $http
- application artchitecture


use $http to have access to server-side functions

anything followed by $ means its probably some angular 
service

```
var vm = this;

$http.get('https://api-endpoint').then(function(){
  ....
})

```

## Video 42

- custom services
- service vs factory

here we make a function that reaches out the the
http end point to get data from the application

you do this by creating a data factory

What is the difference between a service and a factory?

service: you provide arguments which then gives you 
the instance of a function. A servcie is using the new
function keyword


factory: will provide you a value that is returned by invoking the function
refrence passed through the module.factory function

factories provide you a value instead of a function

```
function FilmFactory($http) {
    return {
      ... function that does http get request. Returns movies
    }
}
  
}
```

how to use:

call the factory from your controller method

## Video 43 - Custom Filters

- custom filters

in previous videos we worked with filters to convert currency,
dates, etc

how to create your own custom filter

1. create a folder called filters
2. create another folder that holds a group of filters
you want to use
3. in that folder have a reverse-filter.js file
4. in this js file declare the filter

and state the function that will do the filtering

```
angular.module('myApp').filter('reverse', reverse);

function reverse(){
  return function(string){
    if (string){
      return string.split('').reverse.join('');
    }
  }
}




```

when would you make a custom filter?

exs...

- annotation added to numbers (1st, 2nd.... adding the st, nd)
- reversing data (string) passed in
- 

## Video 44 - building a single page application

goal of this video is integrating the data into the single page
application

## Video 45 - SPA

- putting in angulart js dependancies
- putting in the angular base code in our public folder (angular-app)
- adding in controllers to our app in our angular-app folder, hotel-display and hotel-list
- 

## Video 46 - SPA

- if someone clicks the name of our app, we want to bring up the info on that
hotel
- you do this by adding a factory
- the controller calls the factory method, then displays the hotels

## Video 47 - SPA

- we make a custom directive where we can view the stars in our review
- create a new folder called hotel-rating, and there we will have the directive
- you can also create components. this is used in angular 2 (instead of custom directives)

## Video 48 - SPA the final part

- sending forms through angular
- sending http post

use ng-pattern to specify rules to validate forms
you can add code such that the form inputs are checked only when the form is submitted

# Section 5 - Authentication

## Video 49 - Authentication

### Server based authentication

How does it work?

- stateless http protocol
- user information stored in cookie
- serialised/deserialized

1. A user puts in their username and passord
2. the server recieves it, and
3. the server creates a cookie
4. all the server communication between the server and the client uses this cookie to make sure the user is authenticated


in token-based authenticated, a token is generated on the serverside
all client communication will use that token
if the token is valid, the server will permit that request

JSON web tokens
-jwt ('jot')
- 'header','payload', 'signature'
- payload can contain data like user name

How to implement this?

backend
-generate token
-handle registration/login

frontend
-handle authentication from the UI

6 steps to add functionality that requires adding inputs to db

1. create model for users -> api/data/users.model.js
2. add model+schema to db.js
3. add controller end point -> api/routes/index.js
4. add controller code -> api/controller/users.controller.js (register, login functionality)
5. add route to api/routes.index.s (these are you authentication routes)
6. use postman to test your controller by sending requests
 * look the console (if you added console logging)
 * checkout your db to see if you have added the data


## Video 50 - adding jwt to the app

install json webtoken

```
npm i jsonwebtoken

```

install bcrypt-nodejs
https://stackoverflow.com/questions/34546272/cannot-find-module-bcrypt

```
npm install bcrypt-nodejs --save
```


## Video 51 - Adding authentication to AngularJS

goals: register a user for