import express from 'express';
import VerifyToken from '../utils/verifyToken';
import UserController from '../controllers/UserController';

const userRouter = express.Router();

userRouter.get('/users', VerifyToken, UserController.viewUsers);
userRouter.get('/users/:id', VerifyToken, UserController.viewUser);
userRouter.post('/users/', VerifyToken, UserController.newUser);
userRouter.put('/users/:id', VerifyToken, UserController.editUser)
userRouter.delete('/users/:id', VerifyToken, UserController.deleteUser)

export default userRouter;