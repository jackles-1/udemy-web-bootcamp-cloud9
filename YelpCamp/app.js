// NPM Packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
// Modules
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

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

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Momo is a window cat.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This is a middleware, that will pass currentUser on to every page. currentUser is used by header.ejs to affect the buttons on the navbar.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

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
// We have isLoggedIn here, so that no one could insert a comment through something like Postman.
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log("Error in comments NEW.");
       } 
       else{
           res.render("comments/new", {campground: campground});
       }
    });
});

// ===============================
// AUTH ROUTES
// ===============================

// REGISTER SHOW
app.get("/register", function(req, res){
    res.render("register");
});

// REGISTER
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
            console.log("Error in REGISTER");
            return res.render("register");
       }
      passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
      });
   }); 
});

// LOGIN SHOW
app.get("/login", function(req, res){
    res.render("login");
});

// LOGIN
app.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campgrounds", 
        failureRedirect:"/login"
        
    }), function(req, res){
});

// LOGOUT
app.get("/logout", function(req, res){
   req.logout(); 
   res.redirect("/campgrounds");
});


// LOGGED IN MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// LISTENER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});