
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({

   username:{
     type:String,
     required:[true,'username canot be blank']
   },
   password:{
    type:String,
    required:[true,'username canot be blank']
   }



})
module.exports=mongoose.model("user",userSchema)  //user here will be collection name inside my database