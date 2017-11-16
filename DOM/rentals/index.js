/*global carRental*/

/* To show items in the dropdown menu*/
function showItems(){
    var dropdown = document.getElementById("rentDropDown");
    document.getElementById("rentDropDown").classList.toggle("show");
    if (dropdown.style.display !== "none"){
        var menuList = document.getElementById("rentDropDownUL");
        var availCarIds = carRental.getAllAvailableTypes().sort();
        var listItems = "";
        var id = "";
        for (var i = 0; i < availCarIds.length; i++){
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

function getCarTypeFromTag(idTag){
    return idTag.split("lid-")[1];
    
}

function getCarIdFromTag(idTag){
    return idTag.split("chkId-")[1];
}

/* Action when list items are selected*/
/*
var liItemSelect = document.getElementsByClassName("li-types");
*/

function getCarItem(car, checkBoxId){
        
        var item = ""
        /*this looks terrible. there has to be a better way*/
        item += '<li class="mdl-list__item mdl-list__item--three-line">';
        item += '<span class="mdl-list__item-primary-content">';
        item += '<i class="fa fa-car fa-2x" aria-hidden="true"></i>';
        item += `<span>${car.model}</span>`;
        item += '<span class="mdl-list__item-text-body">';
        item += `${car.make}. ${car.price}/day. ${car.total-car.taken} available.</span>`;
        //item += '<span class="mdl-list__item-secondary-action">';
        //item += `<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${checkBoxId}">`;
        //item += `<input type="checkbox" id="${checkBoxId}" class="mdl-checkbox__input carCheckBox" checked />`;
        //item += '</label></span></li>';
        item += '<span class="mdl-list__item-secondary-action">';
        item += '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-1">'
        item += '<input type="checkbox" id="list-checkbox-1" class="mdl-checkbox__input" checked />'
        item += '</label>'
        item += '</span>'
        item += '</li>'
        return item;
    
}


function pickDropDownItem(){

    /* get user selection */
    var carType = getCarTypeFromTag(this.id);
    /*get available cars from this type*/
    var carListIds = carRental.getcarsAvailableType(carType);
    var listItems = "";
    var checkBoxId;
    var car;
    for (var i = 0; i < carListIds.length; i++){
        car = carRental.getCarById(carListIds[i]);
        checkBoxId = "chkId-" + car.id;
        listItems += getCarItem(car, checkBoxId);
    }
    
    var carListUL = document.getElementById("availCarsUL");
    carListUL.innerHTML = listItems;
    var liItemSelect = document.getElementsByClassName("carCheckBox");
    for (var i = 0; i < liItemSelect.length; i++) {
        liItemSelect[i].addEventListener('click', pickCar, false);
    }
    
    
    
}

/*A temp place to hold selection data*/
var carsChosen = [];

function pickCar(){
    var carId = getCarIdFromTag(this.id);
    /*store if not in list. if in list, remove*/
    if (carsChosen.indexOf(carId) == -1){
        carsChosen.push(carId);
    }else{
        carsChosen = carsChosen.filter(val => val !== carId);
    }
    console.log(carsChosen);
    
}

/*when user clicks book, the following takes place
1. get car ids from carsChosen
2. check if name filled out. if not filled out, button should be
inactive
3. gets the name and reads arr carsChosen
4. Check CarsChosen. If nothing, then not avilable
5. Applies method bookCar in loop
*/
