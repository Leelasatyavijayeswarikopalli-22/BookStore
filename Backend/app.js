const express=require("express");
const app=express();
require("dotenv").config();
require("./conn/conn");
app.use(express.json());     //to accept json data from frontend
const user=require("./routers/user");
const book=require("./routers/book");
app.use("/api/v1",user);
app.use("/api/v1",book);
app.use("/api/v1",require("./routers/favourite"));
//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
});