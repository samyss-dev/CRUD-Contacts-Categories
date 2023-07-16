import { FastifyRequest, FastifyReply } from 'fastify';
import CategoryRepository from '../repositories/CategoryRepository';

class CategoryController{

	async index(request: FastifyRequest, response: FastifyReply):Promise<void>{
		const categories = await CategoryRepository.findAll();

		response.send(categories);
	}

	async show(request:FastifyRequest<{ Params: {id: string } }>,response:FastifyReply):Promise<void>{
		const { id } = request.params;

		const category = await CategoryRepository.findById(id);

		if (!category){
			response.status(400).send({error: "Category not found." })
		}

		response.send(category);
	}

	async store(request: FastifyRequest<{ Body: {name: string } }>,response: FastifyReply): Promise<void>{
		const { name } = request.body;

		if(!name){
			response.status(400).send({error: "Name is required."})
		}

		const categoryExist = await CategoryRepository.findByName(name);

		if (categoryExist){
			response.status(400).send({error: "Category already exists."})
		}

		const category = await CategoryRepository.create(name);

		response.send(category)
	}

	async update(request:FastifyRequest<{ Params: { id: string}, Body: { name: string } }>,response:FastifyReply):Promise<void>{
		const { id } = request.params;

		const { name } = request.body;

		const categoryExistById = await CategoryRepository.findById(id);

		if(!categoryExistById){
			response.status(400).send({error: 'Category not found.'});
		}

		if(!name){
			response.status(400).send({error: 'Name is required.'})
		}
		const categoryExistByName = await CategoryRepository.findByName(name);

		if(categoryExistByName && categoryExistByName.id !== id){
			response.status(400).send({error: "Category already exists"});
		}

		const category = await CategoryRepository.update(id, name);

		response.send(category)
	}

	async delete (request:FastifyRequest<{ Params: {id: string } }>,response:FastifyReply):Promise<void>{
		const { id } = request.params;

		const category = await CategoryRepository.findById(id);

		if(!category){
			response.status(400).send({error: "Category already exists"});
		}

		await CategoryRepository.delete(id);
	}
}

export default new CategoryController();
