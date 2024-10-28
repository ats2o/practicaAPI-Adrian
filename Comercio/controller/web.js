/* Este archivo "user.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * GET
    * POST 
    * PUT 
    * DELETE
*/

const { webModel } = require('../models') // Importo el modelo de web de la carpeta models
const { matchedData } = require('express-validator') // Importo la funcion matchedData
const { handleHttpERROR } = require('../utils/handleError') // Importo una variable de un archivo que se utilizara en caso de errores

// Importo las funciones necesarias (asumido que están importadas en otra parte del archivo)

// Función para obtener todos los items
const getItems = async (req, res) => {
    try {
        // Obtengo todos los documentos de la colección webModel
        const data = await webModel.find()
        // Envío los datos obtenidos como respuesta
        res.send(data)
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_GET_ITEM', 403)
    }
}

// Función para obtener un único item por su id
const getItem = async (req, res) => {
    try {
        // Extraigo el id de los datos validados de la solicitud
        const {id} = matchedData(req)
        // Busco el documento por su id en la colección webModel
        const data = await webModel.findById(id)
        // Envío el dato obtenido como respuesta
        res.send({data})
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_GET_ITEM', 403)
    }
}

// Función para crear un nuevo item
const createItem = async (req, res) => {
    try {
        // Extraigo los datos validados de la solicitud
        const body = matchedData(req)
        // Creo un nuevo documento en la colección webModel con los datos proporcionados
        const data = await webModel.create(body)
        // Envío el dato creado como respuesta
        res.send({data})
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_CREATE_ITEM', 403)
    }
}

// Función para actualizar un item existente
const updateItem = async (req, res) => {
    try {
        // Extraigo el id y el resto de los datos validados de la solicitud
        const {id, ...body} = matchedData(req)
        // Actualizo el documento en la colección webModel con el id proporcionado y los nuevos datos
        const data = await webModel.findByIdAndUpdate(id, body, {new:true})
        // Envío el dato actualizado como respuesta
        res.send(data)
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_UPDATE_ITEM', 403)
    }
}

// Función para borrar un item de forma permanente por su id
const deleteItem = async (req, res) => {
    try {
        // Extraigo el id de los datos validados de la solicitud
        const {id} = matchedData(req)
        // Elimino el documento de la colección webModel con el id proporcionado
        const data = await webModel.deleteOne({_id:id})
        // Envío el resultado de la operación como respuesta
        res.send(data)
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403)
    }
}

// Función para borrar un item de forma lógica por su id
const deleteItemLogical = async (req, res) => {
    try {
        // Extraigo el id de los datos validados de la solicitud
        const {id} = matchedData(req)
        // Elimino el documento de la colección webModel con el id proporcionado de forma lógica
        const data = await webModel.delete({_id:id})
        // Envío el resultado de la operación como respuesta
        res.send({data})
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_DELETE_LOGICAL_ITEM', 403)
    }
}

// Exporto las funciones creadas para que puedan ser utilizadas en otras partes del proyecto
module.exports = { getItems, getItem, createItem, updateItem, deleteItem, deleteItemLogical }