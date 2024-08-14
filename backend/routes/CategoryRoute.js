import express from 'express';
import CategoryController from '../controllers/CategoryController';

const categoryRouter = express.Router();

categoryRouter.get('/categories', CategoryController.viewCategories);
categoryRouter.get('/categories/:id', CategoryController.viewCategory);
categoryRouter.post('/categories/', CategoryController.newCategory);
categoryRouter.put('/categories/:id', CategoryController.editCategory)
categoryRouter.delete('/categories/:id', CategoryController.deleteCategory)

export default categoryRouter;