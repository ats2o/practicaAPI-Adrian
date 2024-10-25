/* Este archivo "comercio.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * POST 
    * PATCH 
    * DELETE
*/

const { storageModel, webModel } = require('../models') // Importo los dos archivos de models ( modelos/estructura )
const { matchedData } = require('express-validator') // Importo la funcion matchedData
const { handleHttpERROR } = require('../utils/handleError') // Importo una variable de un archivo que se utilizara en caso de errores

// Creo una variable constante donde crea las imagenes
const createItem = async (req, res) => {
    try {
        const {file} = req
        const filedata = {
            filename: file.filename,
            url: process.env.PUBLIC_URL+"/"+file.filename
        }
        const data = await storageModel.create(filedata)
        res.send({data})
    } catch (err) {
        handleHttpERROR(res, 'ERROR_CREATE_ITEM', 403)
    }
}

// Creo una variable constante donde puedo modificar la imagen subida
const push = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const {Array_textos, Array_imagenes} = req.body
        const data = await webModel.findByIdAndUpdate(id, {
            $push: { Array_textos: Array_textos, Array_imagenes: Array_imagenes}}, {new: true}
        )
        res.send({data})
    } catch (err) {
        handleHttpERROR(res, 'ERROR_PUSH_URL', 403)
    }
}

// Creo una variable constante donde elimino de forma permannente la imagen
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await storageModel.deleteOne({_id:id})
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403)
    }
}

// Creo una variable constante donde elimino de forma logica
const deleteItemLogical = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await storageModel.delete({_id:id})
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403)
    }
}

// Exporto todas las variables creadas
module.exports = { push, createItem, deleteItem, deleteItemLogical }