// Importaciones necesarias de Mongoose y funciones de utilidad
import { Schema, model } from "mongoose";
import { createHash } from "../utils/hashFunctions.js";

// Definición del esquema de usuario
const userSchema = new Schema({
    first_name: { type: String, required: true }, // Nombre del usuario, obligatorio
    last_name: { type: String, required: true }, // Apellido del usuario, obligatorio
    email: { type: String, required: true, unique: true }, // Email del usuario, obligatorio y único
    age: { type: Number}, // Edad del usuario, no obligatorio
    password: { type: String, required: true }, // Contraseña del usuario, obligatorio
    cartId: { type: Schema.Types.ObjectId, ref: "cart" }, // Referencia al carrito del usuario
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" }, // Rol del usuario, puede ser "admin" o "user", por defecto "user"
});

// Middleware para validar el email antes de guardar el documento
userSchema.pre("save", function (next) {
    const user = this;

    // Expresión regular para validar el formato del email
    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(user.email);

    // Si el email no es válido, se pasa un error al siguiente middleware
    if (!isValidEmail) return next(new Error("Invalid email"));

    // Si el email es válido, se continúa con el siguiente middleware
    next();
});

// Middleware para hashear la contraseña antes de guardar el documento
userSchema.pre("save", async function (next) {
    const user = this;

    // Si la contraseña no ha sido modificada, se continúa con el siguiente middleware
    if (!user.isModified("password")) return next();

    // Se hashea la contraseña y se asigna al campo password
    const hashedPassword = await createHash(user.password);
    user.password = hashedPassword;

    // Se continúa con el siguiente middleware
    next();
});

// Middleware para hashear la contraseña antes de actualizar el documento
userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();

    // Si la contraseña no ha sido modificada, se continúa con el siguiente middleware
    if (!update.password) return next();

    // Se hashea la contraseña y se asigna al campo password
    const hashedPassword = await createHash(update.password);
    this.setUpdate({ ...update, password: hashedPassword });

    // Se continúa con el siguiente middleware
    next();
});

// Exportación del modelo de usuario
export const userModel = model("user", userSchema);