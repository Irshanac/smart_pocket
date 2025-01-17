import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const ProfileImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Profile_image", 
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], 
  },
});

const Profile_Image = multer({ storage: ProfileImage });
export default Profile_Image;
