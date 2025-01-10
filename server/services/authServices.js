import profile from "../models/profile.js"
import bcrypt from 'bcrypt'
import CustomError from "../utils/customError.js"
export const RegistrationServices = async (data) => {
    if (!data.name || !data.email || !data.password || !data.id_proof) {
        throw new CustomError("All fields are required", 400);
    }

    const userExist = await profile.findOne({ email: data.email });
    if (userExist) {
        throw new CustomError("User already exists with this email address", 409);
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    
    const newProfile = new profile({
        name: data.name,
        email: data.email,
        password: hashPassword,
        id_proof: data.id_proof, 
    });

    await newProfile.save(); 
    return newProfile;
};
export const loginServices = async (email, password) => {
    const userData = await profile.findOne({ email });
    if (!userData) {
      throw new CustomError("Please create an account, Email is invalid", 401);
    }
    if (!userData.role) {
        throw new CustomError("Please wait... You can login after admin verification", 403);
    }
    
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new CustomError("Invalid Password, Try Again", 401);
    }
    return userData
}  