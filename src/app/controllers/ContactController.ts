import {type FastifyRequest, type FastifyReply} from 'fastify';
import ContactRepository from '../repositories/ContactRepository';

class ContactController {
	async index(request: FastifyRequest, response: FastifyReply): Promise<void> {
		const contacts = await ContactRepository.findAll();

		response.send(contacts);
	}

	async show(request: FastifyRequest<{Params: {id: string} }>, response: FastifyReply): Promise<void> {
		const {id} = request.params;

		const contact = await ContactRepository.findById(id);

		if (!contact) {
			return response.status(404).send({error: 'Contact not found'});
		}

		response.send(contact);
	}

	async store(request: FastifyRequest<{Body: {name: string; email: string; phone: string; categoryId: string} }>, response: FastifyReply): Promise<void> {
		const {name, email, phone, categoryId} = request.body;

		if (!name) {
			return response.status(400).send({error: 'Name is required'});
		}

		if (!email) {
			return response.status(400).send({error: 'Email is required'});
		}

		const contactExists = await ContactRepository.findByEmail(email);

		if (contactExists) {
			return response.status(400).send({error: 'This email is already in use'});
		}

		if (!phone) {
			return response.status(400).send({error: 'Phone is required'});
		}

		const contact = await ContactRepository.create(name, email, phone, categoryId);

		response.send(contact);
	}

	async update(request: FastifyRequest<{Params: {id: string}; Body: {name: string; email: string; phone: string; categoryId: string} }>, response: FastifyReply): Promise<void> {
		const {id} = request.params;

		const {name, email, phone, categoryId} = request.body;

		const contactExistsById = await ContactRepository.findById(id);

		if (!contactExistsById) {
			return response.status(404).send({error: 'Contact not found.'});
		}

		if (!name) {
			return response.status(400).send({error: 'Name is required.'});
		}

		if (!email) {
			return response.status(400).send({error: 'Email is required.'});
		}

		const contactExistsByEmail = await ContactRepository.findByEmail(email);

		if (contactExistsByEmail && contactExistsByEmail.id !== id) {
			return response.status(400).send({error: 'This email is already in use.'});
		}

		if (!phone) {
			return response.status(400).send({error: 'Phone is required.'});
		}

		const contact = await ContactRepository.update(id, name, email, phone, categoryId);

		response.send(contact);
	}

	async delete(request: FastifyRequest<{Params: {id: string} }>, response: FastifyReply): Promise<void> {
		const {id} = request.params;

		const contact = await ContactRepository.findById(id);

		if (!contact) {
			return response.status(404).send({error: 'Contact not found'});
		}

		await ContactRepository.delete(id);

		response.status(204);
	}
}

export default new ContactController();
