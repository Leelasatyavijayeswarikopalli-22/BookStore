const User = require("../models/user");
const router=require("express").Router();
const jwt=require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
//add book --admin
router.post("/add-book",authenticateToken,async (req,res)=>{
    try{
        const {id} =req.headers;
        const user= await User.findById(id);
        if(user.role!=="admin"){
            return res.status(403).json({message:"Only admin can add books"});
        }
        const book=new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        await book.save();
        return res.status(200).json({message:"Book added successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in adding book",error:error});
    }
});
//update book
router.put("/update-book",authenticateToken,async (req,res)=>{
    try{
        const {bookid} =req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        return res.status(200).json({message:"Book updated successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in updating book",error:error});
    }
});
//delete book
router.delete("/delete-book",authenticateToken,async (req,res)=>{
    try{
        const {bookid} =req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"Book deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in deleting book",error:error});
    }
});
//get all books
router.get("/get-books",async (req,res)=>{
    try{
        const books= await Book.find().sort({createdAt:-1});   //to get recent books at the top of the list
        return res.status(200).json({message:"Books retrieved successfully",books});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in retrieving books",error:error});
    }
});
//get books upto limit(4)
router.get("/get-books-limit",async (req,res)=>{
    try{
        const books= await Book.find().sort({createdAt:-1}).limit(4);   //to get recent books at the top of the list
        return res.status(200).json({message:"Books retrieved successfully",books});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in retrieving books",error:error});
    }
});
//get book by id
router.get("/get-book-by-id",async (req,res)=>{
    try{
        const {bookid} =req.headers;
        const book= await Book.findById(bookid);
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        return res.status(200).json({message:"Book retrieved successfully",book});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in retrieving book",error:error});
    }
});
module.exports=router;
