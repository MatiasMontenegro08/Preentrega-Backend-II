// Importación del modelo de producto
import { productoModel } from '../models/producto.model.js';

// Clase ProductoDao para manejar las operaciones CRUD de productos
export class ProductoDao {
    // Método para obtener todos los productos
    async getAll() {
        return await productoModel.find();
    }

    // Método para obtener un producto por su ID
    async getById(id) {
        return await productoModel.findById(id).lean();
    }

    // Método para crear un nuevo producto
    async create(producto = {}) {
        let nuevoProducto = await productoModel.create(producto);
        return nuevoProducto.toJSON();
        
    }

    // Método para actualizar un producto existente por su ID
    async update(id, producto) {
        return await productoModel.findByIdAndUpdate(id, producto, { new: true });
    }

    // Método para eliminar un producto por su ID
    async delete(id) {
        return await productoModel.findByIdAndDelete(id);
    }
}

// Exportación de una instancia de ProductoDao
export const productoDao = new ProductoDao();