const user = require("../models/user");

const router=require("express").Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
//sign up
router.post("/signup",async (req,res)=>{
    try{
      const{username,email,password,address}=req.body;
      if(username.length<4){
        return res.status(400).json({message : "username length should be greater than 3"});
      }
      const existingUsername=await user.findOne({username:username});
      if(existingUsername){
        return res.status(400).json({message : "Username already exists"});
      }
      const existingEmail=await user.findOne({email:email});
      if(existingEmail){
        return res.status(400).json({message : "Email already exists"});
      }
      if(password.length<=5){
        return res.status(400).json({message : "Password's length should be greater than 5"});
      }
      const hashPass=await bcrypt.hash(password,10);
      const newUser = new user({username:username,email:email,password:hashPass,address:address});
      await newUser.save();
      return res.status(200).json({message:"Signup successfull"});
    }catch(error){
        res.status(500).json({message:"Error in signup",error:error});
    }
});
//sign in
router.post("/signin",async (req,res)=>{
    try{
        const{username,password}=req.body;
        const existingUser=await user.findOne({username:username});
        if(!existingUser){
            return res.status(400).json({message : "Invalid username"});
        }
        const isMatch=await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(400).json({message : "Invalid password"});
        }else{
            const authClaims=[
                {name:existingUser.username},
                {role:existingUser.role}
            ];
            const token=jwt.sign({authClaims},"bookstore123",{expiresIn:"30d"});
        return res.status(200).json({id:existingUser._id,role:existingUser.role, token:token});
        }
    }catch(error){
        res.status(500).json({message:"Error in signin",error:error});
    }
});
router.get("/get-user-information",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.headers;
        const data=await user.findById(id).select("-password");
        return res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:"Error in fetching user information",error:error});
    }
});
router.put("/update-address",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.headers;
        const {address}=req.body;
        await user.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});
    }catch(error){
        res.status(500).json({message:"Error in updating address",error:error});
    }
});
module.exports=router;