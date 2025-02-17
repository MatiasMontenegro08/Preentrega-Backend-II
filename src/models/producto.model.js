// Importaciones necesarias de Mongoose
import { Schema, model } from "mongoose";

// Definición del esquema de productos
const productosSchema = new Schema({
    title: { type: String, required: true }, // Título del producto, obligatorio
    description: { type: String, required: true }, // Descripción del producto, obligatorio
    code: { type: String, required: true }, // Código del producto, obligatorio
    price: { type: Number, required: true }, // Precio del producto, obligatorio
    status: { type: Boolean, default: true }, // Estado del producto, por defecto es true
    stock: { type: Number, required: true }, // Cantidad en stock del producto, obligatorio
    category: { type: String, required: true }, // Categoría del producto, obligatorio
    thumbnails: { type: Array }, // Array de URLs de imágenes del producto
}, {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
});

// Exportación del modelo de productos
export const productoModel = model("productos", productosSchema);