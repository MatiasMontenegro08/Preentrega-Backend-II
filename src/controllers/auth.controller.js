import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwtFunction.js";
import { verifyPassword } from "../utils/hashFunctions.js";

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({ message: "Email y password son requeridos" });
        try {
            const user = await userModel.findOne({ email });
            if(!user) return res.status(404).json({ message: "Usuario no encontrado" });

            const isPasswordValid = await verifyPassword(password, user.password);

            if(!isPasswordValid) return res.status(400).json({ message: "Password incorrecto" });

            const payload = {
                fullname: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role,
            };

            const token = generateToken(payload);
            
            res.cookie("currentUser", token, {
                maxAge: 100000,
                httpOnly: true,
            });

            res.status(200).json({ message: "Usuario logueado con éxito" });
        } catch (error) {
            res.status(500).json({ message: "Error al loguear usuario", details: error.message });
        }
    };
}

export default new AuthController();