const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltround = 10;
const { UserModel, WalletModel } = require("../model/UserModel");


const sign=async(req,res)=>{
    const {name,email,phone,password}=req.body;
    const bycryptpassword=await bcrypt.hash(password,saltround);
    try{
        const user=await UserModel.create({name,email,phone,password:bycryptpassword});
        await WalletModel.create({user_id:user._id,type:'CREDIT',amount:0});
        const token=jwt.sign({user_id:user._id,user_name:user.name},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(201).json({message:"User registered successfully",token});
    }catch(err){
        res.status(500).json({message:"Error registering user",error:err.message});
    }
};

const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({message:"User does not exist"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        }
        const token=jwt.sign({user_id:user._id,user_name:user.name},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:"User logged in successfully",token});
    }catch(err){
        res.status(500).json({message:"Error logging in user",error:err.message});
    }
};








module.exports={sign,login};