import { Router } from "express";
import VerifyToken from '../utils/verifyToken';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/auth/login', AuthController.login);

authRouter.post('/auth/signup', AuthController.signup);

authRouter.post('/auth/change_password', VerifyToken, AuthController.changePassword);

authRouter.post('/auth/logout', VerifyToken, AuthController.logout);

export default authRouter;