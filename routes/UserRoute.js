import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();

userRouter.get('/users', UserController.viewUsers);
userRouter.get('/users/:id', UserController.viewUser);
userRouter.post('/users/', UserController.newUser);
userRouter.put('/users/:id', UserController.editUser)
userRouter.delete('/users/:id', UserController.deleteUser)

export default userRouter;