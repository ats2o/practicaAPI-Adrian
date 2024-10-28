/* Este archivo "comercio.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * POST 
    * PATCH 
    * DELETE
*/

const { storageModel, webModel } = require('../models') // Importo los dos archivos de modelos (estructura de datos)
const { matchedData } = require('express-validator') // Importo la función matchedData de express-validator para validar y filtrar datos
const { handleHttpERROR } = require('../utils/handleError') // Importo una función para manejar errores HTTP

// Creo una función asíncrona para crear elementos (imágenes)
const createItem = async (req, res) => {
    try {
        const {file} = req // Extraigo el archivo del objeto de solicitud (req)
        const filedata = {
            filename: file.filename, // Obtengo el nombre del archivo
            url: process.env.PUBLIC_URL+"/"+file.filename // Construyo la URL pública del archivo
        }
        const data = await storageModel.create(filedata) // Guardo los datos del archivo en el modelo de almacenamiento
        res.send({data}) // Envío la respuesta con los datos guardados
    } catch (err) {
        handleHttpERROR(res, 'ERROR_CREATE_ITEM', 403) // Manejo el error en caso de que ocurra
    }
}

// Creo una función asíncrona para modificar elementos (imágenes) subidos
const push = async (req, res) => {
    try{
        const {id} = matchedData(req) // Extraigo y valido el ID del objeto de solicitud
        const {Array_textos, Array_imagenes} = req.body // Extraigo los arrays de textos e imágenes del cuerpo de la solicitud
        const data = await webModel.findByIdAndUpdate(id, {
            $push: { Array_textos: Array_textos, Array_imagenes: Array_imagenes}}, {new: true}
        ) // Actualizo el documento en el modelo webModel añadiendo nuevos textos e imágenes
        res.send({data}) // Envío la respuesta con los datos actualizados
    } catch (err) {
        handleHttpERROR(res, 'ERROR_PUSH_URL', 403) // Manejo el error en caso de que ocurra
    }
}

// Creo una función asíncrona para eliminar elementos (imágenes) de forma permanente
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req) // Extraigo y valido el ID del objeto de solicitud
        const data = await storageModel.deleteOne({_id:id}) // Elimino el documento del modelo de almacenamiento
        res.send(data) // Envío la respuesta con los datos de eliminación
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403) // Manejo el error en caso de que ocurra
    }
}

// Creo una función asíncrona para eliminar elementos (imágenes) de forma lógica
const deleteItemLogical = async (req, res) => {
    try {
        const {id} = matchedData(req) // Extraigo y valido el ID del objeto de solicitud
        const data = await storageModel.delete({_id:id}) // Elimino el documento del modelo de almacenamiento de forma lógica
        res.send(data) // Envío la respuesta con los datos de eliminación
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403) // Manejo el error en caso de que ocurra
    }
}

// Exporto todas las funciones creadas para que puedan ser utilizadas en otros archivos
module.exports = { push, createItem, deleteItem, deleteItemLogical }