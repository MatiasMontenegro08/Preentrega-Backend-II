// Importación del DAO de carrito
import { carritoDao } from '../daos/carrito.dao.js';

// Clase CarritoService para manejar la lógica de negocio de carritos
export class CarritoService {
    // Método para obtener todos los carritos
    async getAll() {
        return await carritoDao.getAll();
    }

    // Método para obtener un carrito por su ID
    async getById(id) {
        return await carritoDao.getById(id);
    }

    // Método para crear un nuevo carrito
    async create(carrito) {
        return await carritoDao.create(carrito);
    }

    // Método para actualizar un carrito existente por su ID
    async update(id, carrito) {
        return await carritoDao.update(id, carrito);
    }

    // Método para eliminar un carrito por su ID
    async delete(id) {
        return await carritoDao.delete(id);
    }

    // Método para agregar un producto a un carrito
    async addProductToCart(cid, pid) {
        return await carritoDao.addProductToCart(cid, pid);
    }
}

// Exportación de una instancia de CarritoService
export const carritoService = new CarritoService();