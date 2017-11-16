var carRental = {
    name: "Bebe's Car Rental",
    address: "123 ABC street, RI Ways 02999",
    cars: [
        {
            id: 0,
            type: 'sport',
            price: 10,
            total: 2,
            taken:0,
            make:'mazda',
            model: 'miata',
        },
        {
            id: 1,
            type: 'sedan',
            price: 1,
            total: 10,
            taken:5,
            make:'toyota',
            model: 'corolla'
        },
        {
            id: 2,
            type: 'suv',
            price: 100,
            total: 10,
            taken:5,
            make: 'bmw',
            model: 'X5'
        },
        {
            id: 3,
            type: 'sport',
            price: 1000,
            total: 10,
            taken:5,
            make:'tesla',
            model: 'model s',
        },
        {
            id: 4,
            type: 'compact',
            price: 10,
            total: 10,
            taken:5,
            make:'mini cooper',
            model: 'hard top 2 door',
        },
        {
            id: 5,
            type: 'suv',
            price: 100,
            total: 10,
            taken:5,
            make: 'audi',
            model: 'Q7'
        },
        {
            id: 6,
            type: 'sport',
            price: 1000,
            total: 10,
            taken:9,
            make:'nissan',
            model: 'GT-R',
        },
        {
            id: 7,
            type: 'compact',
            price: 10,
            total: 9,
            taken:9,
            make:'fiat',
            model: '500',
        },
        
    ],

    bookCar: function(carId){
        var allCars = this.cars
        for (var i = 0; i < allCars.length; i++){
            if (allCars[i].id == carId){
                this.cars[i].taken += 1;
            }
            
        }
        
        
    },
    getcarsAvailableType: function(carType) {
        var allCars = this.cars;
        var availCarsId = [];
        var car;
        var numAvail;
        for (var i = 0; i < allCars.length; i++){
            car = allCars[i]
            if (carType == car.type ){

                numAvail = allCars[i].total - allCars[i].taken;

                if (numAvail > 0){

                    availCarsId.push(car.id);

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
        
        
    },
    getAllAvailableTypes: function (){
        var allCars = this.cars;
        var availCarsType = [];
        var car;
        var numAvail;
        for (var i = 0; i < allCars.length; i++){
            car = allCars[i];
            numAvail = allCars[i].total - allCars[i].taken;
            
            if (availCarsType.indexOf(car.type) == -1 && numAvail > 0){
                availCarsType.push(car.type);
            }
        }
        return availCarsType;
        
    }
    
        
    
}

var Rental = class Rental {
  constructor(name, carId, daysRent, carType) {
    this.name = name;
    this.carId = carId;
    this.daysRent = daysRent;
    this.carType = carType;
  }
  
};

var Renters = {
    renters: [
        ],
    addRental: function(name, carId, daysRent) {
        var car = carRental.getCarById(carId)
        const renter = new Rental(name, carId, daysRent, car.type);
        this.renters.push(renter);
        carRental.bookCar(carId);
    }
}
