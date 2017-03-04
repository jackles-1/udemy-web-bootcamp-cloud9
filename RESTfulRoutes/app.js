var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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

// Index
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





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running.");
});