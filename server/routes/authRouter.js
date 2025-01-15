import express from 'express';
import ID_proof from '../middleware/profileMulter.js';
import { register ,refreshToken,login} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', ID_proof.single('id_proof'), register);
router.post('/refresh',refreshToken)
router.post('/login',login)
export default router;
