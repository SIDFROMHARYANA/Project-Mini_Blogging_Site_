const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId
const blogmodelschema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  authorId:{
    type:ObjectId,
    ref:'Authormodel'
  },
  tags:[String],
  category:{
    type:String,
    required:true
  },
  subcategory:{
    type:[String],
    
  },
  isPublished:{
    type:Boolean,
    default:false
  },
  ispublishedAt:{
    type:Date,
    default:null
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  deletedAt:{
    type:Date,
    default:null

  },
  
},{timestamps:true})
module.exports=mongoose.model('Blogmodel',blogmodelschema)

// { title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string},
//  category: {string, mandatory, examples: 
//     [technology, entertainment, life style, food, fashion]}, 
//     subcategory: {array of string, examples[technology-[web development, 
//         mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: 
        
//         {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt:
//          {when the blog is published}, isPublished: {boolean, default: false}}