var express = require("express");
var app = express();

// ROUTES
app.get("/", function(req, res){
   res.send("Hi there!"); 
   console.log("GET request sent to /");
});

app.get("/bye", function(req, res){
   res.send("Goodbye!"); 
   console.log("GET request sent to /bye");
});

app.get("/dog", function(req, res){
   res.send("Meow!"); 
   console.log("GET request to /dog");
});

// Catches GET request so any addres not defined in another route above. First route that is hit that satisfies a given request will be the only one run, so this must go at the end of the routes.
app.get("*", function(req, res){
   res.send("You are a star!");
   console.log("GET request to *");
});

// Tells express to listen for requests. Needed in every server! (callback function isn't necessary)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});
// locally, "proces.env.PORT" would be replaced by 3000, this returns the number of Cloud9's server
