const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../model/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).send({msg:"Semething went wrong"})
            }
            if(hash){
                const user=new UserModel({name, email, password:hash})
                await user.save();
                res.status(201).send({msg:"User registered successfully"})
            }
        })
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email})
        console.log(user)
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    res.status(200).send({ msg: "Login Successfull", "token": jwt.sign({ userID: user._id}, "masai") });
                }else{
                    res.status(400).send("Wrong credentials!")
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={userRouter}