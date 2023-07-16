import { PrismaClient, Contact } from '@prisma/client';

const prisma = new PrismaClient();

class ContactRepository {
	async findAll(): Promise<Contact[]> {
		return prisma.contact.findMany();
	}

	async findById(id: string): Promise<Contact | null> {
		return prisma.contact.findUnique({ where: { id } });
	}

	async findByEmail(email: string): Promise<Contact | null> {
		return prisma.contact.findUnique({ where: { email } });
	}

	async create(name: string, email: string, phone: string, categoryId: string): Promise<Contact> {
		return prisma.contact.create({ data: { name, email, phone, categoryId } });
	}

	async update(id: string, name: string, email: string, phone: string, categoryId: string): Promise<Contact | undefined> {
		return prisma.contact.update({ where: { id }, data: { name, email, phone, categoryId } });
	}

	async delete(id: string): Promise<Contact | undefined> {
		return prisma.contact.delete({ where: { id } });
	}
}

export default new ContactRepository();
