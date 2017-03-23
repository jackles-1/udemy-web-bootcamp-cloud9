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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
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

// EDIT
// :id is a name that we set, (this is the same id used by req.params.id), but we could call it anything
// So, :comment_id is just another variable we're setting
router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
           console.log("Error in Comment EDIT.");
       } 
       else{
            // Here we're passing campground_id, rather than the whole campground, because that's all we need in our edit page.
            // id here, is defined in app.js where we define the paths.
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});

// UPDATE
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
            console.log("Error in Comment UPDATE.");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:comment_id", function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("/campgrounds");
           console.log("Error in Comment DESTROY.");
       }
       else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) ;
});

// LOGGED IN MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;