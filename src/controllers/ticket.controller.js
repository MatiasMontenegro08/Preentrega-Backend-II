import { ticketService } from '../services/ticket.service.js';

// Clase TicketController para manejar las solicitudes HTTP relacionadas con tickets
class TicketController {
    // Método para obtener todos los tickets
    static async getAll(req, res) {
        try {
            const tickets = await ticketService.getAll();
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para obtener un ticket por su ID
    static async getById(req, res) {
        const { id } = req.params;

        try {
            const ticket = await ticketService.getById(id);
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para agregar un nuevo ticket
    static async create(req, res) {
        const { title, description, user_id } = req.body;

        // Validación de datos requeridos
        if (!title || !description || !user_id) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        try {
            const ticket = await ticketService.create({
                title,
                description,
                user_id,
            });

            res.status(201).json(ticket);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para actualizar un ticket existente por su ID
    static async update(req, res) {
        const { id } = req.params;
        const { title, description, user_id } = req.body;

        try {
            const ticket = await ticketService.update(id, {
                title,
                description,
                user_id,
            });

            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para eliminar un ticket por su ID
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const ticket = await ticketService.delete(id);
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }
}

// Exportación de la clase TicketController
export default TicketController;