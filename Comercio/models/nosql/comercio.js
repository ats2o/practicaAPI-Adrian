const mongoose = require("mongoose")
const CommerceScheme = new mongoose.Schema(
    {
        nombre_comercio: {
            type: String
        },
        cif: {
            type: String
        },
        direccion: {
            type: String
        },
        email: {
            type: String,
            unique: true 
        },
        telefono: {
            type: String
        },
        id: {
            type: Number
        }
    }
);

module.exports = mongoose.model("comercio", CommerceScheme);