/*global carRental*/
/*global Renters*/
/* To show items in the dropdown menu*/
function carTypeItem(carType) {
    var id = "lid-" + carType;
    var liItem = document.createElement("LI");
    liItem.setAttribute("class", "mdl-list__item");
    liItem.id = id;

    var spanContent = document.createElement("SPAN");
    spanContent.setAttribute("class", "mdl-list__item-primary-content");
    spanContent.innerHTML = carType;
    liItem.appendChild(spanContent);
    liItem.addEventListener('click', pickDropDownItem, false);
    document.getElementById("rentDropDownUL").appendChild(liItem);

}


function showItems() {
    /*check if cars available*/
    if (!carsAvailable()) {
        return
    }
    var dropdown = document.getElementById("rentDropDown");
    dropdown.classList.toggle("show");

    if (dropdown.style.display !== "none") {
        var availCarIds = carRental.getAllAvailableTypes().sort();
        for (var i = 0; i < availCarIds.length; i++) {
            carTypeItem(availCarIds[i]);
        }
    }

}

function getCarTypeFromTag(idTag) {
    return idTag.split("lid-")[1];

}

function clearItems(ulIdName) {
    var UL = document.getElementById(ulIdName);
    while (UL.hasChildNodes()) {
        UL.removeChild(UL.lastChild);
    }
}


function renderCarItem(car) {
    var checkBoxId = "chkId-" + car.id;
    var liItem = document.createElement("LI");
    liItem.setAttribute("class", "mdl-list__item mdl-list__item--three-line carItems");

    var spanContent = document.createElement("SPAN");
    spanContent.setAttribute("class", "mdl-list__item-primary-content");
    spanContent.innerHTML = '<i class="material-icons">directions_car</i>';

    var spanPrimary = document.createElement("SPAN");
    spanPrimary.innerHTML = car.model;

    var spanSecondary = document.createElement("SPAN");
    spanSecondary.setAttribute("class", "mdl-list__item-text-body");
    spanSecondary.innerHTML = `${car.make}.$${car.price}/day. ${car.total-car.taken} available.`;

    spanContent.appendChild(spanPrimary);
    spanContent.appendChild(spanSecondary);

    // checbox
    var checkBoxLabel = document.createElement("LABEL");
    checkBoxLabel.setAttribute("class", "mdl-checkbox mdl-js-checkbox");

    var checkBox = document.createElement("INPUT");
    checkBox.type = "checkbox";
    checkBox.id = checkBoxId;
    checkBox.setAttribute("class", "mdl-checkbox__input");
    if (carIsSelected(car.id)) {
        checkBox.checked = true;
    }
    checkBox.setAttribute('onclick', `pickCar(${car.id});`);
    checkBoxLabel.htmlFor = checkBoxId;
    checkBoxLabel.appendChild(checkBox);

    liItem.appendChild(spanContent);
    liItem.appendChild(checkBoxLabel);

    document.getElementById("availCarsUL").appendChild(liItem)
}

/*A temp place to hold selection data*/
var carsChosen = [];

function pickDropDownItem() {
    /* make the car type drop down list go away after selection*/
    document.getElementById("rentDropDown").classList.toggle("show");
    clearItems("rentDropDownUL")
    clearItems("availCarsUL")

    var carType = getCarTypeFromTag(this.id)
    var carListIds = carRental.getcarsAvailableType(carType);

    for (var i = 0; i < carListIds.length; i++) {
        var car = carRental.getCarById(carListIds[i]);
        renderCarItem(car)
    }

    componentHandler.upgradeDom('MaterialCheckbox');

}

function carIsSelected(carId) {

    if (carsChosen.indexOf(carId) == -1) {
        return false;
    } else {
        return true;
    }

}


function pickCar(carId) {
    if (!carIsSelected(carId)) {
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

    var total = 0;
    for (var i = 0; i < carsChosen.length; i++) {
        var carId = carsChosen[i];
        var car = carRental.getCarById(carId);
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