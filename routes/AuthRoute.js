import { Router } from "express";
import AuthController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/auth/login', AuthController.login);

authRouter.post('/auth/signup', AuthController.signup);

authRouter.post('/auth/change_password', AuthController.changePassword);

authRouter.post('/auth/logout', AuthController.logout);

export default authRouter;