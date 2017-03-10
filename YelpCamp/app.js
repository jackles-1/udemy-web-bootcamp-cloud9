// NPM Packages
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
// Modules
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
    
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
// needed to take in form data
app.use(bodyParser.urlencoded({extended: true}));
// needed to include a .css or .js file
app.use(express.static("public"));
// tells it to assume templates are .ejs
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } 
       else{
           res.render("index", {campgrounds: allCampgrounds});    
       }
    });
});

// CREATE
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");      
        }
    })
});

// NEW
app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

// SHOW
app.get("/campgrounds/:id", function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          console.log(err);
      } 
      else{
          res.render("show", {campground: foundCampground});
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});