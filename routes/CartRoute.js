import express from 'express';
import CartController from '../controllers/CartController';

const cartRouter = express.Router();

cartRouter.get('/carts', CartController.viewCarts);
cartRouter.get('/carts/:id', CartController.viewCart);
cartRouter.post('/carts/', CartController.newCart);
cartRouter.put('/carts/:id', CartController.editCart)
cartRouter.delete('/carts/:id', CartController.deleteCart)

export default cartRouter;