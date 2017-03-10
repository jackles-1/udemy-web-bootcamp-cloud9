var mongoose = require("mongoose");
var Comment = require("./models/comment");
var Campground = require("./models/campground");

var data = [
        {name: "Nerpground", 
        image: "http://www.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg", 
        description: "Nerpground is the best!"},
        {name: "Derpground", 
        image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg",  
        description: "Derpground is the best!"},
        {name: "Merpground", 
        image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg", 
        description: "Merpground is the best!"}
    ]


function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log("Error in Seeds.js remove.");
        }
        else{
            console.log("Removed Campgrounds.");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log("Error in Seeds.js forEach.");
                    } 
                    else{
                        console.log("Added a campground.");
                        Comment.create(
                            {text: "I'm a comment look at me!",
                            author: "Comment Bob"},
                            function(err, comment){
                                if(err){
                                    console.log("Error in seeds.js create Comment.")
                                }
                                else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Added a comment.");
                                }
                            });
                    }
                });
            });
        }
    });
};

module.exports = seedDB;

