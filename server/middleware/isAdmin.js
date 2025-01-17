import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import CustomError from "../utils/customError.js";
const isAdmin = asyncErrorResolver((req, res, next) => {
  if (!req.user || req.user.role!=='Admin') {
    throw new CustomError("Access denied. Admin only.", 403);
  }
  next();
});

export default isAdmin;
