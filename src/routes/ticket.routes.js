import { Router } from 'express';
import { authenticateCookie, authorize } from '../middleware/auth.middleware.js';
import ticketController from '../controllers/ticket.controller.js';

const ticketRouter = Router();

ticketRouter.get("/", authenticateCookie, ticketController.getAll);
ticketRouter.get("/:id", authenticateCookie, ticketController.getById);
ticketRouter.post("/", authenticateCookie, authorize(["user"]), ticketController.create);

export default ticketRouter;