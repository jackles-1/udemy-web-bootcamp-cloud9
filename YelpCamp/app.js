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
    seedDB          = require("./seeds"),
// Routes
    commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");

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

// Tells our app to use our routes files.
// The first argument will be applied to the beginning of every route from these route files.
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// LISTENER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});