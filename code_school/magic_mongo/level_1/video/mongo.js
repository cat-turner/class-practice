

/*

“Name”
“Health”
Last fought (date)
Attacks (array)
Enter 3 names for attacks a monster could do example: “bite”
Stats (object)
Attack (number)
Defense (number)



Create a mongo.js file
Inside the file:
Create a function that accepts the 4 attributes plus a 5th variable called db. This variable would reference the mongodb like in the shell. 
Write the javascript code that would insert the four attributes into the “monster” collection as a new document.
Write the code that would then console.log all the documents inside the collection.
Write the command that will find your monster based on a name
Write the command that will find a monster based on one of the attacks it has (if possible use a command that will return more than one monster with the same attack type)
Write the command that will find a monster based on their defense stat.

*/

function createDocument(name, health, attacksArray, statsObj, db){
    db.myGame.insert({
        "Name":name,
        "Health":health,
        "Last Fought": Date(),
        "Attacks": attacksArray,
        "stats":statsObj
    });
    
    
}

// create the document
createDocument("Cat",9000, ["code", "sleep", "eat"], {"Attack":1000000, "Defense":1000000}, db);
createDocument("Cat2",9000, ["code", "sleep", "eat"], {"Attack":1000000, "Defense":1000000}, db);

// Write the code that would then console.log all the documents inside the collection.
db.myGame.find();

//Write the command that will find your monster based on a name

db.myGame.find({"Name":"Cat"});

// Write the command that will find a monster based on one of the attacks it has 
//(if possible use a command that will return more than one monster with the same attack type)

db.myGame.find({"Attacks":"eat"})


// Write the command that will find a monster based on their defense stat.

db.myGame.find({"stats.Attack":1000000});