var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// must be after app.use(bodyParser.urlencoded...)
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now()}
});
var Blog = mongoose.model("Blog", blogSchema);

// ROUTES

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

// INDEX
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, allBlogs){
     if(err){
         console.log("Error at index");
     }  
     else{
         res.render("index", {blogs: allBlogs});
     }
   });
});

// NEW
app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

// CREATE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, blog){
       if(err){
           console.log("Error in Create");
           res.render("new");
       } 
       else{
           res.redirect("/blogs");
       }
    });
});

// SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
           console.log("Error in Show");
       } 
       else{
           res.render("show", {blog: foundBlog});
       }
    });
});

// EDIT
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
            console.log("Error in Edit");
        }   
        else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/");
           console.log("Error in Update");
       } 
       else{
           res.redirect("/blogs/" + req.params.id);
       }
    });
});

// DELETE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/");
           console.log("Error in Delete");
       } 
       else{
           res.redirect("/");
       }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running.");
});