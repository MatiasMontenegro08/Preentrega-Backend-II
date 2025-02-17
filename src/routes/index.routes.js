import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import {productoRoutes} from "./productos.routes.js";
import viewsRoutes from "./views.routes.js";
import {carritoRoutes} from "./carrito.routes.js";
import ticketRoutes from "./ticket.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/products", productoRoutes);
router.use("/carts", carritoRoutes);
router.use("/views", viewsRoutes);
router.use("/tickets", ticketRoutes);

export default router;