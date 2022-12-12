const mongoose=require("mongoose");
const TodoSchema=mongoose.Schema({
    userID:String,
    taskname:String,
    status:Boolean,
    tag:String
});
const TodoModel=mongoose.model("Todo",TodoSchema);
module.exports=TodoModel;