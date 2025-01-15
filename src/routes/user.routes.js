import { Router } from "express";
import userController from "../dao/user.controller.js";
import { authenticateCookie, authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticateCookie, authorize(["admin"]), userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.addUser);
userRouter.delete("/:id", userController.userDelete);

export default userRouter;