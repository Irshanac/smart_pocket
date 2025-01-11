import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import CustomError from "../utils/customError.js";
const isProvider = asyncErrorResolver((req, res, next) => {
  if (!req.user || req.user.role!=='Provider') {
    throw new CustomError("Access denied. Provider only.", 403);
  }
  next();
});

export default isProvider;
