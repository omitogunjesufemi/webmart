import express from 'express';
import VerifyToken from '../utils/verifyToken';
import OrderController from '../controllers/OrderController';

const orderRouter = express.Router();

orderRouter.get('/orders', VerifyToken, OrderController.viewOrders);
orderRouter.get('/orders/:id', VerifyToken, OrderController.viewOrder);
orderRouter.post('/orders/', VerifyToken, OrderController.newOrder);
orderRouter.put('/orders/:id', VerifyToken, OrderController.editOrder)
orderRouter.delete('/orders/:id', VerifyToken, OrderController.deleteOrder)

export default orderRouter;