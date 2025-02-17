// Importación de la biblioteca Joi para la validación de datos
import Joi from "joi";

// Definición del esquema de validación para productos utilizando Joi
export const productoDto = Joi.object({
    title: Joi.string().required(), // Título del producto, obligatorio
    description: Joi.string().required(), // Descripción del producto, obligatorio
    code: Joi.string().required(), // Código del producto, obligatorio
    price: Joi.number().required(), // Precio del producto, obligatorio
    stock: Joi.number().required(), // Cantidad en stock del producto, obligatorio
    category: Joi.string().required(), // Categoría del producto, obligatorio
    thumbnails: Joi.array().items(Joi.string()), // Array de URLs de imágenes del producto, opcional
});