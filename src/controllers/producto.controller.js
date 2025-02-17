import { productoService } from '../services/producto.service.js';

// Clase ProductoController para manejar las solicitudes HTTP relacionadas con productos
class ProductoController {
    // Método para obtener todos los productos
    static async getAll(req, res) {
        try {
            const productos = await productoService.getAll();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para obtener un producto por su ID
    static async getById(req, res) {
        const { id } = req.params;

        try {
            const producto = await productoService.getById(id);
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para agregar un nuevo producto
    static async create(req, res) {
        const { title, description, code, price, stock, category } = req.body;

        // Validación de datos requeridos
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        try {
            const producto = await productoService.create({
                title,
                description,
                code,
                price,
                stock,
                category,
            });

            res.status(201).json(producto);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para actualizar un producto existente por su ID
    static async update(req, res) {
        const { id } = req.params;
        const { title, description, code, price, stock, category } = req.body;

        try {
            const producto = await productoService.update(id, {
                title,
                description,
                code,
                price,
                stock,
                category,
            });

            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }

    // Método para eliminar un producto por su ID
    static async delete(req, res) {
        const { id } = req.params;

        try {
            await productoService.delete(id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({
                error: 'Hubo un error',
                details: error.message,
            });
        }
    }
}

// Exportación de la instancia de ProductoController
export default ProductoController;