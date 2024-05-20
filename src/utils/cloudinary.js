import {v2 as cloudinary} from "cloudinary"
import exp from "constants";
import { response } from "express";
import {fs} from "fs"



          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary=async (localfilepath)=>{
try {
  if(!localfilepath)return null
  // upload the file path on cloudinary
  cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
  // if file upload successfully
  console.log("file is upload on cloudinary",response.url);
  return response
} catch (error) {
  fs.unlinkSync(localfilepath)//it remove the file from the cloudinary after uload
  return null;
}
}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
  export {uploadOnCloudinary}