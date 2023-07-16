import fastify, { FastifyInstance } from 'fastify';
import ContactRoutes from './app/routes/ContactRoutes';
import CategoryRoutes from './app/routes/CategoryRoutes';

const server: FastifyInstance = fastify();

server.register(ContactRoutes);
server.register(CategoryRoutes);

server.listen({ port: 3000 }).then(() => { console.log('🎈 server running.') }).catch((error) => { console.error(error) });


