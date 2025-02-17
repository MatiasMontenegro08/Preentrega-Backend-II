// Importación del modelo de ticket
import { ticketModel } from '../models/ticket.model.js';

// Clase TicketDao para manejar las operaciones CRUD de tickets
export class TicketDao {
    // Método para obtener todos los tickets
    async getAll() {
        return await ticketModel.find();
    }

    // Método para obtener un ticket por su ID
    async getById(id) {
        return await ticketModel.findById(id);
    }

    // Método para crear un nuevo ticket
    async create(ticket) {
        return await ticketModel.create(ticket);
    }

    // Método para actualizar un ticket existente por su ID
    async update(id, ticket) {
        return await ticketModel.findByIdAndUpdate(id, ticket, { new: true });
    }

    // Método para eliminar un ticket por su ID
    async delete(id) {
        return await ticketModel.findByIdAndDelete(id);
    }
}

// Exportación de una instancia de TicketDao
export const ticketDao = new TicketDao();