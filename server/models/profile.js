import mongoose from "mongoose"
const profileModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String },
    id_proof: { type: String }, 
    profile_image: { type: String },
    contact_number: { type: String }, 
    date_of_birth: { type: Date },
    gender: { type: String, enum: ["Male", "Female"] },
    role: { type: String, enum: ['Student', 'Provider', 'Admin'] },
    bio: { type: String, maxlength: 100 },
    address: { house_name: { type: String }, location: { type: String }, district: { type: String }, state: { type: String } },
    Educational_details: { college_name: { type: String }, location: { type: String }, passout_year: { type: Number } },
    service: { photo: { type: [String] }, title: { type: String }, description: { type: String }, salary: { type: Number } }
});

const profile=mongoose.model("profile",profileModel)
export default profile