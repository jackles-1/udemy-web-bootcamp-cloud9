var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

// needed to take in form data
app.use(bodyParser.urlencoded({extended: true}));
// needed to include a .css or .js file
app.use(express.static("public"));
// tells it to assume templates are .ejs
app.set("view engine", "ejs");


var campgrounds = [
    {name: "Derpground", image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg"},
    {name: "Nerpground", image: "http://www.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg"},
    {name: "Merpground", image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"},
    {name: "Derpground", image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg"},
    {name: "Nerpground", image: "http://www.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg"},
    {name: "Merpground", image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"},
    {name: "Derpground", image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg"},
    {name: "Nerpground", image: "http://www.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg"},
    {name: "Merpground", image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"}
];


app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
})