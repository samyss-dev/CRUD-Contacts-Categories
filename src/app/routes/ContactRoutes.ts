import { FastifyInstance } from 'fastify';
import ContactController from '../controllers/ContactController';

const ContactRoutes = async (router: FastifyInstance) => {
	router.get('/contacts', ContactController.index);
	router.get('/contacts/:id', ContactController.show);
	router.post('/contacts', ContactController.store);
	router.put('/contacts/:id', ContactController.update);
	router.delete('/contacts/:id', ContactController.delete);
};

export default ContactRoutes;
