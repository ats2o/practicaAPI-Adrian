/* Este archivo "user.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * GET
    * POST 
    * PUT 
    * DELETE
*/

const { webModel } = require('../models') // Importo el modelo de web de la carpeta models
const { matchedData } = require('express-validator') // Importo la funcion matchedData
const { handleHttpERROR } = require('../utils/handleError') // Importo una variable de un archivo que se utilizara en caso de errores

// Creo una variable constante donde va a obtener todos los items
const getItems = async (req, res) => {
    try {
        const data = await webModel.find()
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_GET_ITEM', 403)
    }
}

// Creo una variable constante donde va a obtener un unico item ( por su id )
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await webModel.findById(id)
        res.send({data})
    } catch (err) {
        handleHttpERROR(res, 'ERROR_GET_ITEM', 403)
    }
}

// Creo una variable constante donde va las webs
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await webModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpERROR(res, 'ERROR_CREATE_ITEM', 403)
    }
}

// Creo una variable constante donde va a modificar las webs ya creadas
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const data = await webModel.findByIdAndUpdate(id, body, {new:true})
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_UPDATE_ITEM', 403)
    }
}

// Creo una variable constante donde va borrar de forma permanente la web ( por su id )
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await webModel.deleteOne({_id:id})
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403)
    }
}

// Creo una variable constante donde va a borrar de forma logica la web ( por su id )
const deleteItemLogical = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await webModel.delete({_id:id})
        res.send({data})
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_LOGICAL_ITEM', 403)
    }
}

// Exporto las variables creadas
module.exports = { getItems, getItem, createItem, updateItem, deleteItem, deleteItemLogical }