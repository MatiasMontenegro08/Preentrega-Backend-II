import { userModel } from "../models/user.model.js";

// Curso Backend I este archivo los nombrabamos como userManager.js

class UserController {
    static async getUsers(req, res){
        try {
            const users = await userModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    };

    static async getUserById(req, res){
        const { id } = req.params;

        try {
            const user = await userModel.findById(id);
            res.status(200).json(user);
        }catch( error){
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    }

    static async addUser(req, res){
        const { first_name, last_name, email, role, password } = req.body;

        if(!first_name || !last_name || !email || !role || !password){
            return res.status(400).json({ message: "Faltan datos" });
        }

        try {
            const user = new userModel({
                first_name,
                last_name,
                email,
                role,
                password,
            });

            await user.save();
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
        }
    };

    static async userDelete(req, res){
        const { id } = req.params;

        try {
            const user = await userModel.findByIdAndDelete(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
                details: error.message,
            });
            
        }
    };
}

export default UserController;