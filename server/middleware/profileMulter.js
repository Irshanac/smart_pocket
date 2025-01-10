import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const IDStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ID_proof", 
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], 
  },
});

const ID_proof = multer({ storage: IDStorage });
export default ID_proof;
