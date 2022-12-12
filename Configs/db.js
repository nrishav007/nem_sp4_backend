const mongoose=require("mongoose");
const env=require("dotenv");
env.config();
mongoose.set('strictQuery', false);
const url=process.env.MONGO_URL;
const Database_Connection=mongoose.connect(url);
module.exports=Database_Connection;