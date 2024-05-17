import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema=new Schema({
videofile:{
  type:String,//url from cloudnary
  required:true
},
thumbnail:{
  type:String,//url from cloudnary
  required:true
},
title:{
  type:String,
  required:true
},
description:{
  type:String,
  required:true
},
duration:{
  type:number,
  required:true
},
views:{
  type:number,
  default:0
},
ispublished:{
  type:Boolean,
  default:true,
},
videoOwner:{
  type:Schema.Types.ObjectId,
  ref:"User",
}
},{timestamps:true})
videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model("Video",videoSchema)