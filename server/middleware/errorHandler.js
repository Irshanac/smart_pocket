import { STATUS } from "../utils/constants.js"
const errorHandler=(error,req,res,next)=>{
    const statusCode=error.statusCode||500
    const message=error.message || "Internal Server Error"
    res.status(statusCode).json({status:STATUS.ERROR,message})
}
export default errorHandler