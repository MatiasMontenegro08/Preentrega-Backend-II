// Importación del userService
import { userService } from "../services/user.service.js";

// Clase UserController para manejar las solicitudes HTTP relacionadas con usuarios
class UserController {
    // Método para obtener todos los usuarios
    static async getAll(req, res) {
        try {
            const users = await userService.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    }

    // Método para obtener un usuario por su ID
    static async getById(req, res) {
        const { id } = req.params;

        try {
            const user = await userService.getById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    }

    // Método para agregar un nuevo usuario
    static async create(req, res) {
        const { first_name, last_name, email, role, password } = req.body;

        // Validación de datos requeridos
        if (!first_name || !last_name || !email || !role || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        try {
            const user = await userService.create({
                first_name,
                last_name,
                email,
                role,
                password,
            });

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    }

    // Método para eliminar un usuario por su ID
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const user = await userService.delete(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    }

    // Método para actualizar un usuario por su ID
    static async update(req, res) {
        const { id } = req.params;
        const { first_name, last_name, email, role, password } = req.body;

        // Validación de datos requeridos
        if (!first_name || !last_name || !email || !role || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        try {
            const user = await userService.update(id, {
                first_name,
                last_name,
                email,
                role,
                password,
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    }
}

// Exportación de la clase UserController
export default UserController;