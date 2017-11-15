
/*
2 objects
Car rental
Rental - name of renter & car type

Site should have form
Form contains:
Text field input Renter name
Dropdown to select car type.

Selecting cartype should:
Display # available
Display cartype’s price

Button to rent car should:
Not work if renter name empty or car not selected or no cars available
If valid add the Name and car type to rent object
*/

var carRental = {
    name: "Bebe's Car Rental",
    address: "123 ABC street, RI Ways 02999",
    cars: [
        {
            id: 1,
            type: 'sedan',
            price: '1',
            total: 10,
            taken:5,
            make:'toyota',
            model: 'corolla'
        },
        {
            id: 2,
            type: 'suv',
            price: '100',
            total: 10,
            taken:5,
            make: 'bmw',
            model: 'x5'
        },
        {
            id: 3,
            type: 'sport',
            price: '1000',
            total: 10,
            taken:5,
            make:'tesla',
            model: 'model s',
        },
        {
            id: 4,
            type: 'compact',
            price: '10',
            total: 10,
            taken:5,
            make:'mini cooper',
            model: 'hard top 2 door',
        },
        {
            id: 5,
            type: 'suv',
            price: '100',
            total: 10,
            taken:5,
            make: 'bmw',
            model: 'x5'
        },
        {
            id: 6,
            type: 'sport',
            price: '1000',
            total: 10,
            taken:5,
            make:'tesla',
            model: 'model s',
        },
        {
            id: 7,
            type: 'compact',
            price: '10',
            total: 10,
            taken:5,
            make:'mini cooper',
            model: 'hard top 2 door',
        },
        
    ],

    bookCar: function(carId){
        for (var i = 0; i < allCars.length; i++){
            if (allCars[i].id == carId){
                this.cars[i].taken += 1;
            }
            
        }
        
        
    },
    carsAvailableType: function(carType) {
        var allCars = this.cars;
        var availCarsId = [];
        var car;
        var numAvail;
        for (var i = 0; i < allCars.length; i++){
            car = allCars[i]
            if (carType == car.type ){

                numAvail = allCars[i].total - allCars[i].taken;

                if (numAvail > 0){

                    availCarsId.push(allCars[i].id);

                }
                
            }

        }
        return availCarsId;
    },
    
    getCarById: function(carId) {
        var allCars = this.cars;
        for (var i = 0; i < allCars.length; i++){
            if (allCars[i].id == carId){
                return allCars[i];
            }
            
        }
        
        
    }
    
        
    
}

var Rental = class Rental {
  constructor(name, carId, daysRent) {
    this.name = name;
    this.carId = carId;
    this.daysRent = daysRent;
  }
  
};

var Renters = {
    renters: [
        ],
    addRental: function(name, carId, daysRent) {
        const renter = new Rental(name, carId, daysRent);
        this.renters.push(renter);
    }
}

/*
to do:
print objs
check if functions work
make html page for rents*/