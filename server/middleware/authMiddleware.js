
import { verifyToken } from '../utils/jwt.js';
import CustomError from '../utils/customError.js';
import profile from '../models/profile.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new CustomError('Access token missing', 401);
    }

    const decoded = verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new CustomError('Invalid or expired access token', 403);
    }

    const user = await profile.findById(decoded.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;


