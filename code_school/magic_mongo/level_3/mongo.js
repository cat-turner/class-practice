
var setupData = function(db){
        db.myGame.insert({"name": "Bat",
            	"Level": 4,
            	"health": 25,
            	"type": "Flying",
            	"attacks": ["scratch", "bite"],
            	"stats": {
            		"attack": 5,
            		"defense": 2
            	},
            	"style": "cool"
            });
        db.myGame.insert({
            	"name": "Dog",
            	"Level": 5,
            	"health": 250,
            	"type": "Ground",
            	"attacks": ["claw", "chomp"],
            	"stats": {
            		"attack": 50,
            		"defense": 1
            	},
            	"style": "not_cool"
            });
        db.myGame.insert({
            	"name": "Cat",
            	"Level": 2,
            	"health": 250,
            	"type": "Ground",
            	"attacks": ["claw", "meow"],
            	"stats": {
            		"attack": 6,
            		"defense": 1
            	},
            	"style": "not_cool"
            });
            /* minified:
db.myGame.insert({name:"Bat",Level:4,health:25,type:"Flying",attacks:["scratch","bite"],stats:{attack:5,defense:2},style:"cool"}),db.myGame.insert({name:"Dog",Level:5,health:250,type:"Ground",attacks:["claw","chomp"],stats:{attack:50,defense:1},style:"not_cool"}),db.myGame.insert({name:"Cat",Level:2,health:250,type:"Ground",attacks:["claw","meow"],stats:{attack:6,defense:1},style:"not_cool"});
*/
}


var mongo = function(db){

        //Write the command that will find all monsters with an attack lower than 10
        db.myGame.find({"stats.attack": {$lt:10}});
        // exprect: Cat, Bat
        //Write the command that will find all monsters with a level above 5 but below 15 inclusive
        db.myGame.find({"Level": {$gt:5, $lte:15}});
        // expect: nothing
        //Write the command to find monsters that do not have the “bite” attack.
        db.myGame.find({"attacks":{$nin:["bite"]}});
        // expect: cat, dog
        //Write the command to find monsters with levels less than 6 but only return the name, level and health attributes
        db.myGame.find({"Level": {$lt:6}}, {"name":1, "Level":1, "health":1});
        //expect: everything
        
        //Write the command to find all monsters who attack is between 10 and 20 but do not include the monsters health or style
        db.myGame.find({"stats.attack": {$gt:10, $lt:20}},{"health":0, "style":0});
        //expect: nothing
        
        //Write the command to find out how many monsters are in the collection.
        db.myGame.count();
        // expect: 3
        //Write the command to sort the collection by the monsters level with the highest level at the top and the lowest at the bottom
        db.myGame.find().sort({ "Level": -1 });
        // expect: dog, bat, cat

}