import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryRepository{
	async findAll(): Promise<Category[]> {
		return prisma.category.findMany();
	}

	async findById(id: string): Promise<Category | null> {
		return prisma.category.findUnique({ where: { id } });
	}

	async findByName(name: string): Promise<Category | null> {
		return prisma.category.findUnique({ where: { name } });
	}

	async create(name: string): Promise<Category> {
		return prisma.category.create({ data: { name } });
	}

	async update(id: string, name: string): Promise<Category | null> {
		return prisma.category.update({ where: { id }, data: { name } });
	}

	async delete (id: string): Promise<Category | null> {
		return prisma.category.delete({ where: { id } });
	}
}

export default new CategoryRepository();
