var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var app = express();

// Set up express-session.
app.use(require("express-session")({
    secret: "Momo is a spazz",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Set up passport.
app.use(passport.initialize());
app.use(passport.session());
// These methods can be used because in user.ejs, we setup passport's methods.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

mongoose.connect("mongodb://localhost/auth_demo");

// ======
// ROUTES
// ======

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret", function(req, res){
   res.render("secret"); 
});

// REGISTER ROUTES

// show sign up
app.get("/register", function(req, res){
   res.render("register"); 
});

// submit user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           console.log("Error in /register POST");
       } 
       else{
            // We have "local" here because we installed and are using passport-local. 
           passport.authenticate("local")(req, res, function(){
              res.redirect("/secret"); 
           });
       }
    });
});

// LOGIN ROUTES
// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});

// submit login 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.");
});


