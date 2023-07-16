import { FastifyInstance } from 'fastify';
import CategoryController from '../controllers/CategoryController';

const CategoryRoutes = async (router: FastifyInstance) => {
  router.get('/categories', CategoryController.index);
  router.get('/categories/:id', CategoryController.show);
  router.post('/categories', CategoryController.store);
  router.put('/categories/:id', CategoryController.update);
  router.delete('/categories/:id', CategoryController.delete);
};

export default CategoryRoutes;
