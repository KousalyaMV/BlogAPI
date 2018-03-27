//defining mongoose schema
//including in module
var mongoose=require('mongoose');
//declare schema object
var Schema=mongoose.Schema;

var blogSchema=new Schema({
	title:{type:String,default:'',required:true},
	subTitle:{type:String,default:''},
	blogBody:{type:String,default:''},
	tags:[],//name of tags in array
	created_at:{type:Date},
	Modified_at:{type:Date},
	authorInfo:{} //information of author in form of object
});

mongoose.model('MyBlog',blogSchema);