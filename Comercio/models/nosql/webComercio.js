// Importa el módulo mongoose para interactuar con MongoDB
const mongoose = require('mongoose')

// Importa el plugin mongoose-delete para habilitar el borrado lógico en los esquemas de mongoose
const mongooseDelete = require('mongoose-delete')

// Define un nuevo esquema de mongoose llamado webComercio
const webComercio = new mongoose.Schema(
    {
        comercioCif: {
            type: String,
            required: true,
            unique: true
        },
        // Campo Ciudad de tipo String
        Ciudad: {
            type: String
        },
        // Campo Actividad de tipo String
        Actividad: {
            type: String
        },
        // Campo Titulo de tipo String
        Titulo: {
            type: String
        },
        // Campo Resumen de tipo String
        Resumen: {
            type: String
        },
        // Campo Array_textos que es un array de Strings
        Array_textos: {
            type: [String]
        },
        // Campo Array_imagenes que es un array de Strings
        Array_imagenes: {
            type: [String]
        },
        // Campo resenas_users que contiene un objeto con varios subcampos
        resenas_users: {
            // Subcampo Scoring de tipo Number con valores entre 0 y 5
            Scoring: {
                type: Number,
                min: 0,
                max: 5
            },
            // Subcampo Numero_puntuaciones de tipo Number
            Numero_puntuaciones: {
                type: Number,
            },
            // Subcampo Resenas de tipo String
            Resenas: {
                type: String
            },
        },
    },
    {
        // Habilita la creación automática de timestamps (createdAt y updatedAt)
        timestamp: true,
        // Desactiva la creación del campo __v (versionKey)
        versionKey: false
    }
)

// Aplica el plugin mongoose-delete al esquema webComercio para habilitar el borrado lógico
webComercio.plugin(mongooseDelete, { overrideMethods: "all" })

// Exporta el modelo webComercio basado en el esquema definido
module.exports = (mongoose.model("webComercio", webComercio))