// Importación de la biblioteca Joi para la validación de datos
import Joi from "joi";

// Definición del esquema de validación para carritos utilizando Joi
export const carritoDto = Joi.object({
    products: Joi.array().items(Joi.object({
        product: Joi.string().required(), // ID del producto, obligatorio
        quantity: Joi.number().required(), // Cantidad del producto, obligatorio
    })).min(0).required(), // Permite que el array esté vacío
});