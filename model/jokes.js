var connection = require("../db/db");
var app = require("../app");
var db;



//Fetches a random joke from the DB!
var randomJoke = function(callback)
{
    var joke;
    var err;

    connection.connect("mongodb://localhost:27017/test", function()
    {
        db = connection.get();
        findAllJokes(db, function(docs)
        {
             noOfJokes = docs.length;
             rand = Math.floor((Math.random() * noOfJokes));
            //return docs[rand];
            if(err)
            {
                callback(err);
            }
            joke = docs[rand];

            callback(joke);
        });

    });

    connection.close();
};
/*
randomJoke(function(err, docs)
{
    console.log("err er: "+ err);
    console.log("random Joke er : " + docs.joke);
});
//EKS på brug af randomJoke funktionen, vil printe den string der er associeret med objektet docs joke property!

randomJoke(function(err,docs)
{
    console.log("fandt denne vittighed!: " + docs.joke);
});
*/


var allJokes = function(callback)
{
    connection.connect("mongodb://localhost:27017/test", function()
    {
        db = connection.get();
        findAllJokes(db, function(docs)
        {
            if(err)
            {
                callback(err);
            }
            var jokeList = [];
            for(var i = 0; i < docs.length; i++)
            {
                jokeList.push(docs[i].joke);
            }

            callback(jokeList);
        });
    });
    connection.close();
};

//EKS på brug af all jokes, finder alle jokes i DB og printer dem på hver deres linie, med deres arrayIndex stående først (i).
/*
allJokes(function(err, docs)
{
    for(var i = 0; i < docs.length; i++)
    {
        console.log(i+ "   "  +docs[i]);
    }
});
*/

var findAllJokes = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('jokes');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {

        if(err)
        {
            callback(err);
        }
        console.log("Found the following records");
        callback(docs);
    });
};

module.exports =
{
  randomJoke : randomJoke()
};

/*
module.exports =
{
    randomJoke : randomJoke()
    //allJokes : allJokes()
};

*/