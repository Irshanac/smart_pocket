import mongoose from "mongoose";
const applicationModel=new mongoose.Schema({
    job_id:{ type: mongoose.Types.ObjectId, ref: "job", required: true },
    student_id:{type:mongoose.Types.ObjectId,ref:"profile",required:true},
    status:{type:String,enum: ["Pending", "Accepted", "Rejected","Cancelled"], required: true,default:"Pending" }
},{ timestamps: true }
)
const application=mongoose.model("application",applicationModel)
export default application