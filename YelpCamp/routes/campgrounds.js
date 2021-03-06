var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX
router.get("/", function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
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
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW
router.get("/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log("Error in campgrounds SHOW.");
          res.redirect("/campgrounds");
      } 
      else{
          res.render("campgrounds/show", {campground: foundCampground});
      }
   });
});

// EDIT 
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});   
    });
});

// UPDATE
router.put("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log("Error in campground UPDATE");
           console.log(err);
           res.redirect("/campgrounds");
       } 
       else{
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY
router.delete("/:id", checkCampgroundOwnership,function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/camprounds");
            console.log("Error in campground DESTROY");
        } 
        else{
            res.redirect("/campgrounds");
        }
   });
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
   if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
          if(err){
              console.log("Error in checkCampgroundOwnership");
              res.redirect("back");
          } 
          else{
                // because req.user._id is a mongoose object, and author.id is a string, we have to use the mongoose function equals() to test them against each other
                if(foundCampground.author.id.equals(req.user._id)){
                    next();  
                }
                else{
                    res.redirect("back");
                }
          }
        });
    }
    else{
        // takes the user back to where they came from
        res.redirect("back");
    } 
};

module.exports = router;