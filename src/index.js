import dotenv from "dotenv"
import connectDB from "./db/index.js";
connectDB()
dotenv.config({
  path:'./env'
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