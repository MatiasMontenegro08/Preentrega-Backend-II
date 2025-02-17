// Importaciones necesarias de Express y middleware de autenticación
import { Router } from "express";
import { authenticateCookie } from "../middleware/auth.middleware.js";

const viewsRouter = Router();

// Verificar si el usuario está autenticado (usando la cookie currentUser)
viewsRouter.get("/", (req, res) => {
    if (!req.cookies.currentUser) return res.redirect("/login");
    
    res.redirect("/current");
});

// Mostrar la vista current si el usuario está autenticado.
viewsRouter.get("/current", authenticateCookie, (req, res) => {
    if (req.user) return res.render("current", { user: req.user });

    res.redirect("/");
});

export default viewsRouter;