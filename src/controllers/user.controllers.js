import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/ApiResponse.js"


const registerUser=asyncHandler(async(req,res)=>{
// get user detailes from frontend
// validation not empty
// check if user already exist by email or username
// check for image or check for avatar
// upload them to cloudinary,avatar
// create user object-create entry in db
// remove password and token field from response due not show at frontend
// check for user creation
// return response

const{fullname,email,username,password}=req.body
console.log("email :",email);
if([fullname,username,email,password].some((field)=>field?.trim()==="")){
  throw new ApiError(400,"All fields compulsary are required")
}
const existedUser=await User.findOne({
  $or:[{email},{username}]
})
if(existedUser){
  throw new ApiError(409,"username or email aready exist")
}
// console.log(req.files)
const avatarLocalPath=  req.files?.avatar[0]?.path
// const coverImageLocalPath=  req.files?.coverImage[0]?.path
let coverImageLocalPath
if(req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0){
  coverImageLocalPath=req.files.coverImage[0].path
}
if(!avatarLocalPath){
  throw new ApiError(400,"avatar file must be required")
}
const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)
if(!avatar){
  throw new ApiError(400,"avatar file required")
}
 const user=await User.create({
  fullname,
  avatar:avatar.url,
  coverImage:coverImage?.url || "",
  email, 
  password,
  username:username.toLowerCase(),
})

const createdUser=await User.findById(user._id).select("-password -refreshToken")

if(!createdUser){
  throw new ApiError(500,"something went wrong at time creating user")
}
return res.status(201).json(
  new Apiresponse(200,createdUser," user registered successfully")
)

})
export {registerUser,}