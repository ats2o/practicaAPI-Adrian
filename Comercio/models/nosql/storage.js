const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true,
        varsionKey: false
    }
)

StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("storage", StorageScheme) // Nombre de la coleccion (o de la tabla en SQL)