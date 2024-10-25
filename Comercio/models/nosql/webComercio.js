const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const webComercio = new mongoose.Schema(
    {
        Ciudad : {
            type: String
        },
        Actividad: {
            type: String
        },
        Titulo: {
            type: String
        },
        Resumen: {
            type: String
        },
        Array_textos: {
            type: [String]
        }, 
        Array_imagenes: {
            type: [String]
        },
        resenas_users: {
            Scoring: {
                type: Number,
                min: 0,
                max:5
            },
            Numero_puntuaciones: {
                type: Number,
            },
            Resenas: {
                type: String
            },
        }, 
    },
    {
        timestamp: true, 
        versionKey: false
    }
)

webComercio.plugin(mongooseDelete, {overrideMethods:"all"})
module.exports = (mongoose.model("webComercio", webComercio))