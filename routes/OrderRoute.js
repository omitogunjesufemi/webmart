import express from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = express.Router();

orderRouter.get('/orders', OrderController.viewOrders);
orderRouter.get('/orders/:id', OrderController.viewOrder);
orderRouter.post('/orders/', OrderController.newOrder);
orderRouter.put('/orders/:id', OrderController.editOrder)
orderRouter.delete('/orders/:id', OrderController.deleteOrder)

export default orderRouter;