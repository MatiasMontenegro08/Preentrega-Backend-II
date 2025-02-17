// Importación del modelo de carrito
import { carritoModel } from '../models/carrito.model.js';

// Clase CarritoDao para manejar las operaciones CRUD de carritos
export class CarritoDao {
    // Método para obtener todos los carritos
    async getAll() {
        return await carritoModel.find().populate("products.product").lean();
    }

    // Método para obtener un carrito por su ID
    async getById(id) {
        return await carritoModel.findById(id).populate("products.product").lean();
    }

    // Método para crear un nuevo carrito
    async create(carrito = {}) {
        let nuevoCarrito = await carritoModel.create(carrito);
        return nuevoCarrito.toJSON();
    }

    // Método para actualizar un carrito existente por su ID
    async update(id, carrito) {
        return await carritoModel.findByIdAndUpdate(id, carrito, { new: true });
    }

    // Método para eliminar un carrito por su ID
    async delete(id) {
        return await carritoModel.findByIdAndDelete(id);
    }

    // Método para agregar un producto a un carrito
    async addProductToCart(cid, pid) {
        let carrito = await carritoModel.findById(cid);
        if (!carrito) {
            throw new Error('Carrito no encontrado');
        }

        let existeProductoEnCarrito = carrito.products.find(cp => cp.product.toString() === pid);

        if (existeProductoEnCarrito) {
            existeProductoEnCarrito.quantity += 1;
        } else {
            carrito.products.push({ product: pid, quantity: 1 });
        }

        await carrito.save();
        return carrito;
    }
}

// Exportación de una instancia de CarritoDao
export const carritoDao = new CarritoDao();