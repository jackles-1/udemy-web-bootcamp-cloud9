var express     = require("express"),
    app         = express(),
    request     = require("request"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
// needed to take in form data
app.use(bodyParser.urlencoded({extended: true}));
// needed to include a .css or .js file
app.use(express.static("public"));
// tells it to assume templates are .ejs
app.set("view engine", "ejs");

// schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String, 
   description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Derpground", 
//     image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg",
//     description: "This is Derpground!"
// }, function(err, campground){
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("New campground: ");
//         console.log(campground);
//     }
// });

// http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg
// http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg
// http://www.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg
// http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=ZIRksnnh

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