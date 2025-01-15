import { Schema, model } from "mongoose";
import { createHash } from "../utils/hashFunctions.js";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cartId: { type: Schema.Types.ObjectId, ref: "cart" },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" },
});

// Middlewares de Mongoose

// Middleware para validar el email
userSchema.pre("save", function (next) {
    const user = this;

    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(user.email);

    if (!isValidEmail) return next(new Error("Invalid email"));

    next();
});

// Middleware para hashear la contraseña
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const hashedPassword = await createHash(user.password);
    user.password = hashedPassword;

    next();
});

export const userModel = model("user", userSchema);