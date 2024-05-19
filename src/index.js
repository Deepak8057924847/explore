import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js';
dotenv.config({
  path:'./env'
})
connectDB()

.then(()=>{
  app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running is at this port${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("mongo db connnection failed",err);
})




/*
import express from "express"
const app =express()(
  async()=>{
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("errror",(error)=>{
        console.log("ERRR:",error);
        throw error

      });
      app.listen(process.listen.PORT,()=>{
        console.log(`app is listening ${process.listen.PORT}`)
      })
    }catch(error){
      console.error("error",error)
      throw error
    }
})()*/