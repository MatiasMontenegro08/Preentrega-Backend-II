// Importación del DAO de producto
import { productoDao } from '../daos/producto.dao.js';

// Clase ProductoService para manejar la lógica de negocio de productos
export class ProductoService {
    // Método para obtener todos los productos
    async getAll() {
        return await productoDao.getAll();
    }

    // Método para obtener un producto por su ID
    async getById(id) {
        return await productoDao.getById(id);
    }

    // Método para crear un nuevo producto
    async create(producto) {
        return await productoDao.create(producto);
    }

    // Método para actualizar un producto existente por su ID
    async update(id, producto) {
        return await productoDao.update(id, producto);
    }

    // Método para eliminar un producto por su ID
    async delete(id) {
        return await productoDao.delete(id);
    }
}

// Exportación de una instancia de ProductoService
export const productoService = new ProductoService();