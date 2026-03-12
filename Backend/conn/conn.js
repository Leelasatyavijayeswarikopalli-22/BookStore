const mongoose=require("mongoose");

//creating connection
const conn= async()=>{
    try{
        await mongoose.connect(`${process.env.URI}`);
        console.log("Database connected successfully");
    }catch(error){
        console.log(error);
    }
};
conn();