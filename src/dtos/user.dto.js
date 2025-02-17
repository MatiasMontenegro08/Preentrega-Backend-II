// Importación de la biblioteca Joi para la validación de datos
import Joi from "joi";

// Definición del esquema de validación para usuarios utilizando Joi
export const userDto = Joi.object({
    first_name: Joi.string().required(), // Nombre del usuario, obligatorio
    last_name: Joi.string().required(), // Apellido del usuario, obligatorio
    email: Joi.string().email().required(), // Email del usuario, debe ser un email válido y es obligatorio
    age: Joi.number(), // Edad del usuario, no es obligatorio
    password: Joi.string().required(), // Contraseña del usuario, obligatorio
    role: Joi.string().valid("admin", "user").default("user"), // Rol del usuario, puede ser "admin" o "user", por defecto "user"
});