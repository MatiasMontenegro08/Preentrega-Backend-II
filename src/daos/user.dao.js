// Importación del modelo de usuario
import { userModel } from "../models/user.model.js";

// Clase UserDao para manejar las operaciones CRUD de usuarios
export class UserDao {
    // Método para obtener todos los usuarios
    async getAll() {
        return await userModel.find();
    }

    // Método para obtener un usuario por su ID
    async getById(id) {
        return await userModel.findById(id);
    }

    // Método para crear un nuevo usuario
    async create(user) {
        return await userModel.create(user);
    }

    // Método para actualizar un usuario existente por su ID
    async update(id, user) {
        return await userModel.findByIdAndUpdate(id, user, { new: true });
    }

    // Método para eliminar un usuario por su ID
    async delete(id) {
        return await userModel.findByIdAndDelete(id);
    }
}

// Exportación de una instancia de UserDao
export const userDao = new UserDao();