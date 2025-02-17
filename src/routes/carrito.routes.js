import { Router } from "express";
import { procesarErrores } from "../utils/utils.js";
import { isValidObjectId } from "mongoose";
import CarritoController from "../controllers/carrito.controller.js";
import ProductoController from "../controllers/producto.controller.js";
import { authenticateCookie, authorize } from "../middleware/auth.middleware.js";

export const carritoRoutes = Router();

carritoRoutes.get("/", CarritoController.getAll);

carritoRoutes.get("/:id", CarritoController.getById);

carritoRoutes.post("/", CarritoController.create);

carritoRoutes.post("/:cid//product/:pid", authenticateCookie, authorize(["user"]), CarritoController.addProductCart);

carritoRoutes.post("/:cid/purchase", authenticateCookie, authorize(["user"]), CarritoController.purchase);

// Rutas que faltan implementar en el controlador
carritoRoutes.delete("/:cid", async (req, res) => {
    let { cid } = req.params;

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "Id no válido" });
    }

    try {
        let carrito = await CarritoController.getById(cid);
        if (!carrito) {
            return res.status(404).json({ error: `Carrito con ID ${cid} no encontrado.` });
        }

        carrito.products = [];

        let carritoActualizado = await CarritoController.update(cid, carrito);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: "Todos los productos fueron eliminados del carrito.", carrito: carritoActualizado });

    } catch (error) {
        procesarErrores(res, error);
    }
});


carritoRoutes.delete("/:cid/products/:pid", async (req, res) => {
    let { cid, pid } = req.params;

    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "Id no válido" });
    }

    try {
        let carrito = await CarritoController.getById(cid);
        if (!carrito) {
            return res.status(404).json({ error: `Carrito con ID ${cid} no encontrado.` });
        }

        let productoIndex = carrito.products.findIndex(cp => cp.product._id.toString() === pid);

        if (productoIndex === -1) {
            return res.status(404).json({ error: `Producto con ID ${pid} no encontrado en el carrito.` });
        }

        carrito.products.splice(productoIndex, 1);

        let carritoActualizado = await CarritoController.update(cid, carrito);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: "Producto eliminado del carrito.", carrito: carritoActualizado });

    } catch (error) {
        procesarErrores(res, error);
    }
});


carritoRoutes.put("/:cid", async (req, res) => {
    let { cid } = req.params;
    let { products } = req.body;

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "Id no válido" });
    }

    if (!Array.isArray(products) || products.some(p => !p.product || !p.quantity || typeof p.quantity !== 'number' || p.quantity < 1)) {
        return res.status(400).json({ error: "El body debe contener un arreglo de productos con las propiedades 'product' y 'quantity' válidas." });
    }

    try {
        let carrito = await CarritoController.getById(cid);
        if (!carrito) {
            return res.status(404).json({ error: `Carrito con ID ${cid} no encontrado.` });
        }

        for (let { product } of products) {
            let productoExistente = await ProductoController.getById(product);
            if (!productoExistente) {
                return res.status(400).json({ error: `El producto con ID ${product} no existe en la Base de Datos.` });
            }
        }

        carrito.products = products;

        let carritoActualizado = await CarritoController.update(cid, carrito);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: "Carrito actualizado correctamente.", carrito: carritoActualizado });

    } catch (error) {
        procesarErrores(res, error);
    }
});

carritoRoutes.put("/:cid/products/:pid", async (req, res) => {
    let { cid, pid } = req.params;
    let { quantity } = req.body;

    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "Id no válido" });
    }

    if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ error: "El parámetro 'quantity' debe ser un número positivo mayor a 0." });
    }

    try {
        let carrito = await CarritoController.getById(cid);
        if (!carrito) {
            return res.status(404).json({ error: `Carrito con ID ${cid} no encontrado.` });
        }

        let producto = carrito.products.find(cp => cp.product._id.toString() === pid);

        if (!producto) {
            return res.status(404).json({ error: `Producto con ID ${pid} no encontrado en el carrito.` });
        }

        producto.quantity = quantity;

        let carritoActualizado = await CarritoController.update(cid, carrito);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: "Cantidad actualizada correctamente.", carrito: carritoActualizado });

    } catch (error) {
        procesarErrores(res, error);
    }
});
