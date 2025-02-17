// Importaciones necesarias de Mongoose
import { Schema, model } from "mongoose";

// Definición del esquema de carrito
const carritoSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "productos", // Referencia al modelo de productos
                required: true // El campo product es obligatorio
            },
            quantity: {
                type: Number,
                required: true, // El campo quantity es obligatorio
                min: 1 // La cantidad mínima es 1
            }
        }
    ]
}, {
    timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Exportación del modelo de carrito
export const carritoModel = model("carrito", carritoSchema);