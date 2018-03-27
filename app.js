//including express module
var express = require('express');
//careting instance of express
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //use to get body parameters

//include model files
var Blog=require('./models/blogmodel');

//calling a mongoose module
var mongoose=require('mongoose');

//middleware to parse body parameters
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//defining configuration the database
var dbPath="mongodb://localhost/myblogapp"; 
//command to connect with database
db=mongoose.connect(dbPath);
mongoose.connection.once('open',function(){
console.log("database connection open success");
});


var routes = require('./routes/blogroutes'); //importing route
routes(app); //register the route

app.get('/',function(req,res){
//console.log("Its a basic blog application to perform CURD operation");

var urlhelp="Its a basic blog application to perform CURD operation\n"; 
var allblog="To get Allblog: /blogs/GetAllBlogs\nTo Get a particular blog: /blogs/blogid/GetABlog\n";
var createblog="To Create blog: /blogs/CreateBlog\nTo update a particular blog: /blogs/blogid/UpdateABlog\n";
var deleteblog="To delete blog: /blogs/blogid/DeleteABlog";
res.send(urlhelp+allblog+createblog+deleteblog);
});

app.get('*',function(req,res,next){
	res.status=404;
	next("Path not found");
});//end 404 error

app.use(function(err,req,res,next){
console.log("request url is "+req.originalUrl);
if(res.status==404)
{
	res.send("request url "+req.originalUrl+" is no more available or doesn't exist!!!");
}
else if(res.status(500)){	
res.send({error:"Something Failed..Internal Server Error"});
}
else {
	res.send(err);
}
});//end custom error handling middleware

app.listen(3000,function(){
	console.log("Listening on port 3000!");
});//end listen