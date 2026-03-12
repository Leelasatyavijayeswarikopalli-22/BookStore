const router=require("express").Router();
const jwt=require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const User=require("../models/user");
const { default: mongoose } = require("mongoose");

//add Book to favorites
router.put("/add-favorite",authenticateToken,async (req,res)=>{
    try{
        const {bookid,id} =req.headers;
        const user= await User.findById(id);
        if(user.favourites.includes(bookid)){
            return res.status(200).json({message:"Book already in favorites"});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"Book added to favorites"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in adding favorite",error:error});
    }
});
//delete book from favorites
router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id} =req.headers;
        const user= await User.findById(id);
        console.log(bookid);
        console.log(id);
        if(!user.favourites.includes(bookid)){
            return res.status(200).json({message:"Book not in favorites"});
        }
        await User.findByIdAndUpdate(id,{$pull:{favourites:new mongoose.Types.ObjectId(bookid)}});
        return res.status(200).json({message:"Book removed from favorites"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in deleting favorite",error:error});
    }
});
module.exports=router;