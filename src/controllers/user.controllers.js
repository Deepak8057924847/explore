import {asyncHandler} from "../utils/asyncHandler.js"
const registerUser=asyncHandler(async(req,res)=>{
res.status(200).json({
  message:"hello deepak mehra how are you"
})

})
export {registerUser,}