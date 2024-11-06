/* Este archivo "comercio.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * GET
    * POST 
    * PUT 
    * DELETE
*/

const express = require('express') // Importo la funcion express
const {comercioModel} = require('../models') // Importo un aricho de la carpeta models (no porngo el archivo en concreto porque predefinidamete va a coger ell llamdado index.js)
const { matchedData } = require('express-validator') // Importo la funcion express-validator
const { handleHttpERROR } = require('../utils/handleError')
const { tokenCif } = require('../utils/handleJwt')

// Creo una variable constante donde pide todos los comercios de forma ascendente
const getComercios = async (req, res) => {
    try{ 
        const dato = await comercioModel.find().sort({ CIF: 1 })
        res.send(dato)
    }catch (err){
        handleHttpERROR(res, 'ERROR_GET_ITEMS', 403)
    }
}

// Creo una variable constante donde pide un unico comercio por si CIF
const getComercio = async (req, res) => {
    try {
        const {CIF} = matchedData(req)
        const dato = await comercioModel.find({ CIF: CIF })
        res.send(dato)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_GET_COMERCIO', 403)
    }
}

// Creo una variable constante donde se puden crear comercios 
const postComercio = async (req, res) => {
    try {
        const body = matchedData(req)
        const datoUser = await comercioModel.create(body)
        const token = await tokenCif(datoUser)
        const dato = {
            token,
            user: datoUser
            }
        res.send(dato)
    } catch (err) {
        console.log(err)
        handleHttpERROR(res, 'ERROR_CREATE_COMERCIO', 403)
    }
}

const loginComercio = async (req, res) => {
    try {
        const body = matchedData(req)
        const datoUser = await comercioModel.findOne({ email: body.email }).select(" name CIF email")
        if (!datoUser) {
            handleHttpERROR(res, 'COMERCIO_NO_EXISTE', 403)
        }
        const token = await tokenCif(datoUser)
        const data = {
            token,
            user: datoUser
        }
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_LOGIN_COMERCIO', 403)
    }
}

// Creo una variable constante donde se puede modificar un comercio por su CIF 
const putComercio = async (req, res) => {
    try {
        // console.log("req.body:", req.body);
        const CIF = req.params.CIF
        const {body} = req
        const dato = await comercioModel.findOneAndUpdate({CIF:CIF}, body, {new:true})
        res.send(dato)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_UPDATE_COMERCIO', 403)
    }
}

// Creo una variable constante donde se puede eliminar un comercio por su CIF
const deleteComercio = async (req, res) => {
    try {
        const cif = req.params.CIF
        const {body} = req
        const dato = await comercioModel.findOneAndDelete({CIF: cif}, body)
        res.send(dato)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_COMERCIO', 403)
    }
};

// Creo una variable constante donde se elimina de fomra logica
const deleteComerciological = async ( req, res) => {
    try {
        const {CIF} = matchedData(req)
        const data = await comercioModel.delete({CIF:CIF})
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERRRO_DELETE_LOGICAL_COMERCIO', 403)
    }
}

// Exporto todas las variables que se han creado
module.exports = { getComercio, getComercios, postComercio, loginComercio, putComercio, deleteComercio, deleteComerciological }