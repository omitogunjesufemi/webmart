import express from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = express.Router();

productRouter.get('/products', ProductController.viewProducts);
productRouter.get('/products/:id', ProductController.viewProduct);
productRouter.post('/products/', ProductController.newProduct);
productRouter.put('/products/:id', ProductController.editProduct)
productRouter.delete('/products/:id', ProductController.deleteProduct)

export default productRouter;