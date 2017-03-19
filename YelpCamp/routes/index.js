var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT
router.get("/", function(req, res){
   res.render("landing");
});

// REGISTER SHOW
router.get("/register", function(req, res){
    res.render("register");
});

// REGISTER
router.post("/register", function(req, res){
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
router.get("/login", function(req, res){
    res.render("login");
});

// LOGIN
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campgrounds", 
        failureRedirect:"/login"
        
    }), function(req, res){
});

// LOGOUT
router.get("/logout", function(req, res){
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


module.exports = router;