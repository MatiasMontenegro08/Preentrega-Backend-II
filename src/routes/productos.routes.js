import { Router } from "express";
import ProductoController from "../controllers/producto.controller.js";
import { authenticateCookie, authorize } from "../middleware/auth.middleware.js";

export const productoRoutes = Router();

productoRoutes.get("/", ProductoController.getAll);

productoRoutes.get("/:id", ProductoController.getById);

productoRoutes.post("/", authenticateCookie, authorize(["admin"]), ProductoController.create);

productoRoutes.put("/:id", authenticateCookie, authorize(["admin"]), ProductoController.update);

productoRoutes.delete("/:id", authenticateCookie, authorize(["admin"]), ProductoController.delete);