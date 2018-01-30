# Introducing MongoDB


Conjouring MongoDB 

Learn how to insert and find your documents.

Our example application will have data for potions, which
include characteristics such as
- strength
- flavor
- grade

## What is MongoDB?

- Open-source NoSQL database

A NoSQL database is a db that is generally not relational
and does not have a query language like SQL.

- Document-oriented
- Great for unstructured data, especially when you have
a lot of it.

## How does MongoDB compare to SQL

| SQL      |      Mongo    |
|----------|:-------------:|
| database |  database     |
| table    |  collection   |
| row      |  document     |



In mongo DB, documents get stored in collections, and collections get stored
in a database.

Mongo has a dynamic schema. What does this mean?

Documents are stored completely on their own. Thi
means that we can store completely different documents
in the same collection.

potion 1: name: sleeping, price: 2.99
potion 2: name: luck, price: 59.99, danger:high

You interact with mongo using the shell, which is launched
right after you run mongo

```
mongo
```

All instances of MongoDB come with a commandline program we can
use to interact with out db using js.

Documents are stored like json-like objects. Documents
are surrounded by curly braces.
Documents come in field, value pairs


## Using the shell

Use the helper methods in the shell to interact with the database


1. Select with db you want; mongo will create this db if it doesn't
exist yet.

```
> use reviews
```


2. You have your data. Put your data in a document. This 
document will then be stored in a collection.

```
{
    "name": "Invisibility",
    "vendor": "Kettlecooked"
}

```

3. Write the data to your mongodb, using insert

```
db.potions.insert(
{
    "name": "Invisibility",
    "vendor": "Kettlecooked"
}
)

```

4. To retrieve a document, use the find method

- with no arguments, returns all the documents
in your collection

```
db.postions.find()

```

# Level 1 Assignment

Requirements
Create a new mongo database called myGame.

Using the shell create a “monsters” collection
Insert at least 2 documents
Each document should contain:
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

Note: you do not need to run the file to confirm it works. Writing the same lines in the mongo console should do this. This is just to confirm you know the syntax.

db.myGame.insert({"Name":"zuzu2", "Health":100, "Last Fought": Date(), "Attacks": ["jump", "stomp", "eat"],"stats":{"Attack":100, "Defense":100}})
db.myGame.insert({"Name":"elmywu", "Health":200, "Last Fought": Date(), "Attacks": ["scratch", "barf", "evil eye"],"stats":{"Attack":10, "Defense":1000}})







