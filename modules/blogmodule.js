//calling a mongoose module
var mongoose=require('mongoose');

var blogModel=mongoose.model('MyBlog');

//now we can perform various function on the database using the variable
//end include

//start route to get all blogs
//////////////////////////here is the routes////////////////////////////////////
exports.list_all_blogs = function(req, res) {
blogModel.find(function(err,result){
if(err){
        console.log(err);
        customMessage={error:'true',message:err,userMessage:'some error occurred..'};
        res.send(customMessage);
    }
    else if(result==undefined || result==null){
        console.log('Error:Blog is not found');
        customMessage={error:'true',message:'Blogs not found',userMessage:'check for issue in console..'};
        res.send(customMessage);
    }
    else {
        console.log(result);
        customMessage={error:null,message:result,userMessage:'Successfully Blog is found!!'};
        res.send(customMessage);
    }// end read blog
});//end blog model find
};//end route to GET ALL BLOGS
    
//start route to get particular blogs
exports.read_a_blog = function(req, res) {
blogModel.findOne({'_id':req.params.blogid},function(err,result){
if(err){
    	console.log(err);
    	customMessage={error:'true',message:err,userMessage:'some error occurred..'};
    	res.send(customMessage);
    }
    else if(result==undefined || result==null){
        console.log('Error:Blog is not found');
    	customMessage={error:'true',message:'Blog is not found',userMessage:'check for issue in console..'};
    	res.send(customMessage);
    }
    else {
    	console.log(result);
    	customMessage={error:null,message:result,userMessage:'Successfully Blog is found!!'};
    	res.send(customMessage);
    }// end read blog
});//end user model find
}//end route to GET ALL BLOGS

//start route for creating a new blog
exports.create_a_blog = function(req, res) {
var newBlog=new blogModel(req.body);

//lets see the tags into array
if(req.body.tags!=null && req.body.tags!=undefined){
var allTags=(req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):'';
newBlog.tags=allTags;
}

//lets see the author information
var authorInfo={fullName:req.body.authorFullName,email:req.body.authorEmail};
if(req.body.authorInfo!=null && req.body.authorInfo!=undefined){
newBlog.authorInfo=authorInfo;
}

//lets start the created date
var today=Date.now();
newBlog.created_at=today;
//now lets save the file
newBlog.save(function(err){
if(err){
    	console.log(err);
    	customMessage={error:'true',message:err,userMessage:'some error occurred..'};
    	res.send(customMessage);
    }
    else if(newBlog==undefined || newBlog==null){
        console.log('Error:Blog is not inserted');
    	customMessage={error:'true',message:'Blog is not inserted',userMessage:'check for issue in console..'};
    	res.send(customMessage);
    }
    else {
    	console.log(newBlog);
    	customMessage={error:null,message:newBlog,userMessage:'Blog inserted successfully!'};
    	res.send(customMessage);
    }

});// end create blog 
};//end new blog save

//start route to edit a blog using _id
exports.update_a_blog = function(req, res) {

var update={};

//title 
if(req.body.title!=null && req.body.title!=undefined){
	update.title=req.body.title;
}//end title
//subTitle
if(req.body.subTitle!=null && req.body.subTitle!=undefined){
	update.subTitle=req.body.subTitle;
}//end subtitle
//blogBody
if(req.body.blogBody!=null && req.body.blogBody!=undefined){
	update.blogBody=req.body.blogBody;
}// end blogBody

//tages into array
var allTags=(req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):'';
if(allTags!=undefined && allTags!=null){	
update.tags=allTags;
}//end allTags

//author info
var authorInfo={fullName:req.body.authorFullName,email:req.body.authorEmail};
if(req.body.authorInfo!=undefined && req.body.authorInfo!=null){
// author information
update.authorInfo=authorInfo;
}//end author info

//lets start the modified date
var today=Date.now();
update.Modified_at=today;

///Model update to update by id///////
blogModel.update({'_id':req.params.blogid},update,function(err,result){
        
  if(err){
    	console.log(err);
    	customMessage={error:'true',message:err,userMessage:'some error occurred..'};
    	res.send(customMessage);
    }
    else if(result.nModified===0){
        console.log('Error:Blog is not updated');
    	customMessage={error:'true',message:'Blog is not updated',userMessage:'Blog id is not correct or dont exist'};
    	res.send(customMessage);
    }
    else {
    	console.log(result);
    	customMessage={error:null,message:result,userMessage:'Blog updated successfully!'};
    	res.send(customMessage);
    }// end update blog

});//end edit a blog using _id

}
//start route to delete a blog using _id
exports.delete_a_blog = function(req, res) {
	blogModel.remove({'_id':req.params.blogid},function(err,result){
        
    if(err){
    	console.log(err);
    	customMessage={error:'true',message:err,userMessage:'some error occurred..'};
    	res.send(customMessage);
    }
    else if(result.result.n>0){
    	console.log(result);
    	customMessage={error:null,message:result,userMessage:'Blog deleted successfully'};
    	res.send(customMessage);
    }
      else if(result.result.n===0){
        console.log(result);
        customMessage={error:null,message:result,userMessage:"Blog doesn't exist to delete"};
        res.send(customMessage);
    }
	});// end remove blog
}//end delete a blog using _id