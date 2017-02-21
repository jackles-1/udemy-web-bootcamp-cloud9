var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
   var animal = req.params.animal.toLowerCase();
   var sounds = {
       pig: "oink",
       cow: "moo",
       dog: "woof",
       cat: "chirp",
       fish: "*stare*"
   }
   var sound = sounds[animal];
   res.send("The " + animal + " says: " + sound + "!");
});

app.get("/repeat/:word/:number", function(req, res) {
   var word = req.params.word;
   var num = Number(req.params.number);
   var message = "";
   for (var i = 0; i < num; i++){
       message += word + " ";
   }
   res.send(message);
});

app.get("*", function(req, res) {
   res.send("Page not found!"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});