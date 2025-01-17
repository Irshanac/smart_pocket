import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    salary: { type: Number, required: true },
    openings: { type: Number, required: true },
    provider_id: { type: mongoose.Types.ObjectId, ref: "profile", required: true },
    status: { type: String, enum: ["Pending", "Accepted","Rejected", "Cancelled"], required: true,default:"Pending" },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true } 
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
