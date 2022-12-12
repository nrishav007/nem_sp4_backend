const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    IP:Number
});
const UserModel=mongoose.model("User",UserSchema);
module.exports=UserModel;