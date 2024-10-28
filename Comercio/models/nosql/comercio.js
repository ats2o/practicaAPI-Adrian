// Importa el módulo mongoose para interactuar con MongoDB
const mongoose = require("mongoose");

// Define un nuevo esquema de mongoose para el modelo "comercio"
const CommerceScheme = new mongoose.Schema(
    {
        // Campo para el nombre del comercio, de tipo String
        nombre_comercio: {
            type: String
        },
        // Campo para el CIF (Código de Identificación Fiscal), de tipo String
        cif: {
            type: String
        },
        // Campo para la dirección del comercio, de tipo String
        direccion: {
            type: String
        },
        // Campo para el email del comercio, de tipo String y debe ser único
        email: {
            type: String,
            unique: true 
        },
        // Campo para el teléfono del comercio, de tipo String
        telefono: {
            type: String
        },
        // Campo para el ID del comercio, de tipo Number
        id: {
            type: Number
        }
    }
);

// Exporta el modelo "comercio" basado en el esquema definido
module.exports = mongoose.model("comercio", CommerceScheme);