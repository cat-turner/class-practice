/*global angular*/

/*

Car image
Car type
Car description
Daily rental price: add a filter to print as currency
Rent now button
Add something else of your own choosing.

*/

(function(){
    var app = angular.module('store', []);
    app.controller('StoreController', function(){
        this.products = cars;
        this.updateQuantity = function(productID){
            for (var i = 0; i < this.products.length; i++){
                var product = this.products[i];
                if (product.id == productID){
                    this.products[i].qty = product.qty - 1;
                    if (this.products[i].qty <= 0){
                        this.products[i].canPurchase = false;
                    }
                    alert(`Car booked! Amount remaining: ${this.products[i].qty}`);
                }
                    
            }
        };
        
    });


    var cars = [
    {
        id: 1,
        name: 'ford',
        price: 3,
        type: 'sedan',
        canPurchase:true,
        description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        color: "tan",
        qty:5,
        images: [
            {
                full: 'ford.png',
            }
            ]
    },
    {
        id: 2,
        name: 'range rover',
        price: 10,
        type: 'suv',
        canPurchase:true,
        description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        color: "grey",
        qty: 5,
        images: [
            {
                full: 'range_rover.jpg'
            }
            ]
    },
    {
        id: 3,
        name: 'beamer',
        price: 3,
        type: 'convertible',
        canPurchase:true,
        description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        color:"red",
        qty:5,
        images: [
            {
                full: 'bmw.jpg'
            }
            ]
    },
    {
        id:4,
        name: 'dodge',
        price: 10,
        type: 'van',
        canPurchase:true,
        description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        color:"blue",
        qty:5,
        images: [
            {
                full: 'dodge.jpg'
            }
            ]
    }
    ];
    
})();