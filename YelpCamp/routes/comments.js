var express = require("express");
// mergeParams merges paramaters from campgrounds and comments, so that Campground.findById works to find comments
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// CREATE
// We have isLoggedIn here, so that no one could insert a comment through something like Postman.
router.post("/", isLoggedIn, function(req, res){
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
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log("Error in comments NEW.");
       } 
       else{
           res.render("comments/new", {campground: campground});
       }
    });
});


// LOGGED IN MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;