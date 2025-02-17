// Importaciones necesarias de Mongoose y la biblioteca uuid para generar identificadores únicos
import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// Definición del esquema de tickets
const ticketSchema = new Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true, 
        default: () => uuidv4() // Genera un UUID único por defecto
    },
    purchase_datetime: { 
        type: Date, 
        default: Date.now // Asigna la fecha y hora actual por defecto
    },
    amount: { 
        type: Number, 
        required: true // Total de la compra, obligatorio
    },
    purchaser: { 
        type: String, 
        required: true // Correo del usuario asociado al carrito, obligatorio
    }
}, {
    timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Exportación del modelo de tickets
export const ticketModel = model("ticket", ticketSchema);