// Importación de la biblioteca Joi para la validación de datos
import Joi from "joi";

// Definición del esquema de validación para tickets utilizando Joi
export const ticketDto = Joi.object({
    code: Joi.string().required(), // Código del ticket, obligatorio
    purchase_datetime: Joi.date().optional(), // Fecha y hora de la compra, opcional (se asigna automáticamente)
    amount: Joi.number().required(), // Total de la compra, obligatorio
    purchaser: Joi.string().required(), // Correo del usuario asociado al carrito, obligatorio
});