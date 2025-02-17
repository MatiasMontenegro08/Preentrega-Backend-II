import { carritoService } from '../services/carrito.service.js';
import { productoService } from '../services/producto.service.js';
import { ticketService } from '../services/ticket.service.js';

// Clase CarritoController para manejar las solicitudes HTTP relacionadas con carritos
class CarritoController {
    // Método para obtener todos los carritos
    static async getAll(req, res) {
        try {
            const carritos = await carritoService.getAll();
            res.status(200).json(carritos);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para obtener un carrito por su ID
    static async getById(req, res) {
        const { id } = req.params;

        try {
            const carrito = await carritoService.getById(id);
            res.status(200).json(carrito);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para agregar un nuevo carrito
    static async create(req, res) {
        const { user_id, producto_id, cantidad } = req.body;

        // Validación de datos requeridos
        if (!user_id || !producto_id || !cantidad) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        try {
            const carrito = await carritoService.create({
                user_id,
                producto_id,
                cantidad,
            });

            res.status(201).json(carrito);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para actualizar un carrito existente por su ID
    static async update(req, res) {
        const { id } = req.params;
        const { user_id, producto_id, cantidad } = req.body;

        // Validación de datos requeridos
        if (!user_id || !producto_id || !cantidad) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        try {
            const carrito = await carritoService.update(id, {
                user_id,
                producto_id,
                cantidad,
            });

            res.status(200).json(carrito);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para eliminar un carrito por su ID
    static async delete(req, res) {
        const { id } = req.params;

        try {
            const carrito = await carritoService.delete(id);
            res.status(200).json(carrito);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    static async addProductCart(req, res) {
        const { cid, pid } = req.params;

        try {
            const carrito = await carritoService.addProductToCart(cid, pid);
            res.status(200).json(carrito);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para realizar la compra de los productos en el carrito
    static async purchase(req, res) {
        const { cid } = req.params;

        try {
            const carrito = await carritoService.getById(cid);
            if (!carrito) {
                return res.status(404).json({ error: `Carrito con ID ${cid} no encontrado.` });
            }

            const productosNoProcesados = [];
            const productosComprados = [];

            for (const item of carrito.products) {
                const producto = await productoService.getById(item.product);
                if (producto.stock >= item.quantity) {
                    producto.stock -= item.quantity;
                    await productoService.update(producto._id, producto);
                    productosComprados.push(item);
                } else {
                    productosNoProcesados.push(item.product);
                }
            }

            // Generar el ticket
            const ticketData = {
                code: `TICKET-${Date.now()}`,
                purchase_datetime: new Date(),
                amount: productosComprados.reduce((total, item) => total + (item.quantity * item.product.price), 0),
                purchaser: req.user.email,
            };
            const ticket = await ticketService.create(ticketData);

            // Actualizar el carrito
            carrito.products = carrito.products.filter(item => productosNoProcesados.includes(item.product));
            await carritoService.update(cid, carrito);

            res.status(200).json({
                message: "Compra finalizada",
                ticket,
                productosNoProcesados,
            });
        } catch (error) {
            res.status(500).json({ error: "Hubo un error", details: error.message });
        }
    }
}

// Exportación de la instancia de CarritoController
export default CarritoController;