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
const existedUser=User.findOne({
  $or:[{email},{username}]
})
if(existedUser){
  throw new ApiError(409,"username or email aready exist")
}
const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path

if(!avatarLocalPath){
  throw new ApiError(400,"avatar file required")
}
const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage=uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
  throw new ApiError(400,"avatar file required")
}
 const user=await User.create({
  fullname,
  avatar:avatar.url,
  coverImage:coverImage?.url || "",
  email, 
  username:username.lowerCase(),
  password
})

const createUser=await User.findbyId(User._id).select("-password -refreshToken")

if(!createUser){
  throw new ApiError(500,"something went wrong at time creating user")
}
return res.status(201).json(
  new Apiresponse(200,createUser," user registered successfully")
)

})
export {registerUser,}