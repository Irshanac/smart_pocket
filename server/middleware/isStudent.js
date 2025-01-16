import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import CustomError from "../utils/customError.js";
const isAdmin = asyncErrorResolver((req, res, next) => {
    console.log(req.user,"user")
  if (!req.user || req.user.role!=='Student') {
    throw new CustomError("Access denied. Student only.", 403);
  }
  next();
});

export default isAdmin;
