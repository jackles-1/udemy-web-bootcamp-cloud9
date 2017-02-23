var request = require("request");

var results = document.querySelector("#results");
var movieSearch = document.querySelector("");

request("http://www.omdbapi.com/?s=" + movieSearch, function(error, response, body){
    if(!error && response.statusCode == 200){
        var parsed = JSON.parse(body);
        results.innerHTML = "<li>"parsed['search']['title']"</li>";
   } 
});