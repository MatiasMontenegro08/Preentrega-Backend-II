import { Router } from "express";
import passport from "passport";
import authController from "../dao/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", authController.login);

authRouter.post("/register", passport.authenticate("register", { session: false }), (req, res) => {
    res.json(req.user);
});

export default authRouter;