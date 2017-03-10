// NPM Packages
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
// Modules
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

// connect to the database
mongoose.connect("mongodb://localhost/yelp_camp");
// needed to take in form data
app.use(bodyParser.urlencoded({extended: true}));
// needed to include a .css or .js file
app.use(express.static(__dirname + "/public"));
// tells it to assume templates are .ejs
app.set("view engine", "ejs");


// SEED DB
seedDB();

// ===============================
// CAMPGROUNDS ROUTES
// ===============================

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
           res.render("campgrounds/index", {campgrounds: allCampgrounds});    
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
   res.render("campgrounds/new"); 
});

// SHOW
app.get("/campgrounds/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } 
      else{
          console.log(foundCampground);
          res.render("campgrounds/show", {campground: foundCampground});
      }
   });
});

// ===============================
// COMMENTS ROUTES
// ===============================

// CREATE
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
            console.log("Error in comments CREATE Campground.findById.");
            res.redirect("/campgrounds");
       } 
       else{
                Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log("Error in comments CREATE Comment.create.");
                } 
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
           
       }
    });
});

// NEW
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log("Error in comments NEW.");
       } 
       else{
           res.render("comments/new", {campground: campground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});