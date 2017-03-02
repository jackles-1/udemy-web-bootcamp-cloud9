var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// connect to, or create, database "cat_db"
mongoose.connect("mongodb://localhost/cat_db");

// define what a "cat" looks like--define its pattern
var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

// compile catSchema into a model "Cat", which we can use as an object (i.e. now we can use the Mongo methods on it we want to use, whereas the schema only has the variables)
// after running this line, Mongo will automatically create a collection call "cats" (it knows how to pluralize things)
var Cat = mongoose.model("Cat", catSchema);


// FIRST WAY TO CREATE A NEW CAT
// create a new cat
var momo = new Cat({
  name: "Momo",
  age: 1.5,
  temperament: "spazz"
});

// save momo to the database
// you don't have to have the callback, but if you don't, you won't know if it doesn't work (also your timing could be off)
// here "george" is what we are adding to the database, and "cat" is what is being returned from the database
momo.save(function(err, cat){
    if(err){
        console.log("Something went wrong.");
    }
    else{
        console.log("We just saved a cat to the database:");
        console.log(cat);
    }
});

// SECOND WAY TO CREATE A NEW CAT
// this does "new" and "save" in one step
Cat.create({
   name: "Frisky",
   age: 21,
   temperament: "frisky"
}, function(err, cat){
    if(err){
        console.log("There was an error: ");
        console.log(err);
    }
    else{
        console.log("We've added a cat: ");
        console.log(cat);
    }
});

// retrieve all cats from the database
Cat.find({}, function(err, cats){
    if(err){
        console.log("There was an error.");
        console.log(err);
    }
    else{
        console.log("All the cats: ");
        console.log(cats);
    }
});