// Importación del DAO de ticket
import { ticketDao } from '../daos/ticket.dao.js';

// Clase TicketService para manejar la lógica de negocio de tickets
export class TicketService {
    // Método para obtener todos los tickets
    async getAll() {
        return await ticketDao.getAll();
    }

    // Método para obtener un ticket por su ID
    async getById(id) {
        return await ticketDao.getById(id);
    }

    // Método para crear un nuevo ticket
    async create(ticket) {
        return await ticketDao.create(ticket);
    }

    // Método para actualizar un ticket existente por su ID
    async update(id, ticket) {
        return await ticketDao.update(id, ticket);
    }

    // Método para eliminar un ticket por su ID
    async delete(id) {
        return await ticketDao.delete(id);
    }
}

// Exportación de una instancia de TicketService
export const ticketService = new TicketService();