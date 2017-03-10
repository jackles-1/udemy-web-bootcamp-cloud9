var mongoose = require("mongoose");
var Comment = require("./models/comment");
var Campground = require("./models/campground");

var data = [
        {name: "Nerpground", 
        image: "http://www.grindtv.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis sem vel lorem faucibus, eu placerat justo venenatis. Phasellus ut feugiat risus. Integer id mattis augue. Nulla vitae mattis diam. Nulla ullamcorper, lorem sit amet consectetur ultrices, purus eros rutrum leo, in bibendum turpis dui et augue. Integer et neque magna. Cras ac suscipit arcu, id maximus est. Curabitur neque dui, dignissim sit amet lacinia a, rutrum vitae libero. Ut faucibus eleifend purus. Nunc efficitur lectus eget metus congue, in blandit mi condimentum. Donec at mi congue, molestie ex id, auctor libero. Aenean in porta augue. Fusce laoreet leo quis nisl tempor. Nam vitae sagittis lorem. Vivamus sed cursus enim."},
        {name: "Derpground", 
        image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg",  
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis sem vel lorem faucibus, eu placerat justo venenatis. Phasellus ut feugiat risus. Integer id mattis augue. Nulla vitae mattis diam. Nulla ullamcorper, lorem sit amet consectetur ultrices, purus eros rutrum leo, in bibendum turpis dui et augue. Integer et neque magna. Cras ac suscipit arcu, id maximus est. Curabitur neque dui, dignissim sit amet lacinia a, rutrum vitae libero. Ut faucibus eleifend purus. Nunc efficitur lectus eget metus congue, in blandit mi condimentum. Donec at mi congue, molestie ex id, auctor libero. Aenean in porta augue. Fusce laoreet leo quis nisl tempor. Nam vitae sagittis lorem. Vivamus sed cursus enim."},
        {name: "Merpground", 
        image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis sem vel lorem faucibus, eu placerat justo venenatis. Phasellus ut feugiat risus. Integer id mattis augue. Nulla vitae mattis diam. Nulla ullamcorper, lorem sit amet consectetur ultrices, purus eros rutrum leo, in bibendum turpis dui et augue. Integer et neque magna. Cras ac suscipit arcu, id maximus est. Curabitur neque dui, dignissim sit amet lacinia a, rutrum vitae libero. Ut faucibus eleifend purus. Nunc efficitur lectus eget metus congue, in blandit mi condimentum. Donec at mi congue, molestie ex id, auctor libero. Aenean in porta augue. Fusce laoreet leo quis nisl tempor. Nam vitae sagittis lorem. Vivamus sed cursus enim."}
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

