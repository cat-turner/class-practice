var hotel = {
    name:'Biltmore',
    rooms:500,
    roomsBooked:200,
    availableRooms: function(){
        return this.rooms - this.roomsBooked;
        
    }
    
};

function getInfo(){
    console.log("hello");
    var totalRooms = hotel.rooms;
    var availRooms = hotel.availableRooms();
    console.log(totalRooms);
    console.log(availRooms);
    
    pName = document.getElementById('name').innerHTML = hotel.name;
    //pName.innerHTML = hotel.name;
    
    pTotal = document.getElementById("total");
    pTotal.innerHTML = hotel.rooms;
    
    pAvail = document.getElementById("avail");
    pAvail.innerHTML = hotel.availableRooms();
}