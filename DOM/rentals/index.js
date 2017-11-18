/*global carRental*/
/*global Renters*/
/* To show items in the dropdown menu*/
function showItems() {
    /*check if cars available*/
    if (!carsAvailable()) {
        return
    }
    var dropdown = document.getElementById("rentDropDown");
    dropdown.classList.toggle("show");
    if (dropdown.style.display !== "none") {
        var menuList = document.getElementById("rentDropDownUL");
        var availCarIds = carRental.getAllAvailableTypes().sort();
        var listItems = "";
        var id = "";
        for (var i = 0; i < availCarIds.length; i++) {
            id = "lid-" + availCarIds[i]
            listItems += `<li id=${id} class="mdl-list__item li-types"><span class="mdl-list__item-primary-content">${availCarIds[i]}</span></li>`;
        }
        /* add li to ul*/
        menuList.innerHTML = listItems;
        /* add event listeners to li*/
        var liItemSelect = document.getElementsByClassName("li-types");
        for (var i = 0; i < liItemSelect.length; i++) {
            liItemSelect[i].addEventListener('click', pickDropDownItem, false);
        }
    }



}

function getCarTypeFromTag(idTag) {
    return idTag.split("lid-")[1];

}

function getCarIdFromTag(idTag) {
    return idTag.split("chkId-")[1];
}



function getCarItem(car, checkBoxId) {
    /*checkbox requires this class to work: carCheckBox */

    var item = ""
    /*this looks terrible. there has to be a better way*/
    item += '<li class="mdl-list__item mdl-list__item--three-line">';
    item += '<span class="mdl-list__item-primary-content">';
    item += '<i class="material-icons">directions_car</i>';
    item += `<span>${car.model}</span>`;
    item += '<span class="mdl-list__item-text-body">';
    item += `${car.make}.$${car.price}/day. ${car.total-car.taken} available.</span>`;
    item += '</span>';
    item += `<label class="mdl-checkbox mdl-js-checkbox" for="${checkBoxId}">`;
    item += `<input type="checkbox" id="${checkBoxId}" class="mdl-checkbox__input carCheckBox">`
    item += '<span class="mdl-checkbox__label"></span>'
    item += '</label>'
    item += '</li>'
    return item;


}

/*A temp place to hold selection data*/
var carsChosen = [];

function pickDropDownItem() {
    /* make the car type drop down list go away after selection*/
    document.getElementById("rentDropDown").classList.toggle("show");

    /* get user selection */
    var carType = getCarTypeFromTag(this.id);
    /*get available cars from this type*/
    var carListIds = carRental.getcarsAvailableType(carType);
    var listItems = "";
    var checkBoxId;
    var car;
    for (var i = 0; i < carListIds.length; i++) {
        car = carRental.getCarById(carListIds[i]);
        checkBoxId = "chkId-" + car.id;
        listItems += getCarItem(car, checkBoxId);
    }

    var carListUL = document.getElementById("availCarsUL");
    carListUL.innerHTML = listItems;
    var liItemSelect = document.getElementsByClassName("carCheckBox");
    for (var i = 0; i < liItemSelect.length; i++) {
        /*liItemSelect[i].addEventListener('click', pickCar, false);*/
        liItemSelect[i].addEventListener('change', pickCar);

    }

    /* render elements as checked*/
    var checkBox;
    for (var i = 0; i < carsChosen.length; i++) {
        checkBoxId = "chkId-" + carsChosen[i];
        checkBox = document.getElementById(checkBoxId);
        if (checkBox && !checkBox.checked) {
            checkBox.checked = true;
        }


    }
    componentHandler.upgradeDom('MaterialCheckbox');



}



function pickCar() {
    var carId = getCarIdFromTag(this.id);
    /*store if not in list. if in list, remove*/
    if (carsChosen.indexOf(carId) == -1) {
        carsChosen.push(carId);
    } else {
        carsChosen = carsChosen.filter(val => val !== carId);
    }

}


function uncheckAll() {
    document.querySelector('.mdl-js-checkbox').MaterialCheckbox.uncheck()
}

function carsAvailable() {
    var availtypes = carRental.getAllAvailableTypes()
    if (availtypes == 0) {
        alert("no cars available :(");
        return false;
    }
    return true;
}



function bookCars() {

    if (!carsAvailable()) {
        return
    }

    var name = document.getElementById("user").value;
    if (name === "") {
        alert("please enter your name");
        return
    }
    var daysRent = document.getElementById("daysrent").value;
    if (daysRent === "") {
        alert("please enter the number of days you'd like to rent a car");
        return
    }

    if (carsChosen.length == 0) {
        alert("Please choose a car.");
        return
    }

    /* add user to Renters class*/
    var carId;
    var car;
    var total = 0;
    for (var i = 0; i < carsChosen.length; i++) {
        carId = carsChosen[i];
        car = carRental.getCarById(carId);
        Renters.addRental(name, carId, daysRent);
        total += parseFloat(car.price) * parseFloat(daysRent);


    }

    alert(`thanks! your total is ${total}`);
    /* clean up*/
    uncheckAll()
    document.getElementById("availableCars").classList.toggle("show");
    carsChosen = [];
    document.getElementById("user").value = "";
    document.getElementById("daysrent").value = "";
    document.getElementById("availCarsUL").innerHTML = "";


}