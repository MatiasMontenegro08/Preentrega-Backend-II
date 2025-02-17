import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticateCookie, authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticateCookie, authorize(["admin"]), userController.getAll);
userRouter.get("/:id", userController.getById);
userRouter.post("/", userController.create);
userRouter.delete("/:id", userController.delete);
userRouter.put("/:id", userController.update);

export default userRouter;