import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    provider_id: { type: mongoose.Types.ObjectId, ref: "profile", required: true },
    service_id: { type: mongoose.Types.ObjectId, ref: "profile", required: true },
    student_id: { type: mongoose.Types.ObjectId, ref: "profile", required: true },
    
  },
  { timestamps: true } 
);

const request = mongoose.model("request", requestSchema);

export default request;
