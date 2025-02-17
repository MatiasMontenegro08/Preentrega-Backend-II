// Importación del DAO de usuario
import { userDao } from '../daos/user.dao.js';

// Clase UserService para manejar la lógica de negocio de usuarios
export class UserService {
    // Método para obtener todos los usuarios
    async getAll() {
        return await userDao.getAll();
    }

    // Método para obtener un usuario por su ID
    async getById(id) {
        return await userDao.getById(id);
    }

    // Método para crear un nuevo usuario
    async create(user) {
        return await userDao.create(user);
    }

    // Método para actualizar un usuario existente por su ID
    async update(id, user) {
        return await userDao.update(id, user);
    }

    // Método para eliminar un usuario por su ID
    async delete(id) {
        return await userDao.delete(id);
    }
}

// Exportación de una instancia de UserService
export const userService = new UserService();