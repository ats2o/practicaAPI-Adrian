/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/
const express = require('express');
const {comercioModel} = require('../models')

const getComercioCIF = async (req, res) => {
    try {
        const {ordenar} = req.query
        const data = await comercioModel.find().sort({cif:ordenar||1})
        res.send(data)
    } catch (err) {
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        res.send({err: err.message})
    }
}

// Creo una variable constante donde pide todos los comercios de forma ascendente
const getTodo = async (req, res) => {
    try {
        const {ordenar} = req.query; 
        const dato = await comercioModel.find().sort({ CIF: ordenar || 1 });
        res.status(200).json(dato);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Creo una variable constante donde pide un unico comercio por si CIF
const getComercio = async (req, res) => {
    const cif = req.params.cif
    const dato = await comercioModel.find({ cif: cif })
    res.send(dato)
}

// Creo una variable constante donde se puden crear comercios 
const postComercio = async (req, res) => {
    const {body} = req
    const dato = await comercioModel.create(body)
    res.send(dato)
}

// Creo una variable constante donde se puede modificar un comercio por su CIF 
const putComercio = async (req, res) => {
    const cif = req.params.cif
    const {body} = req
    const dato = await comercioModel.findOneAndUpdate({ cif: cif }, body, {new: true})
    res.send(dato)
}

// Creo una variable constante donde se puede eliminar un comercio por su CIF
const deleteComercio = async (req, res) => {
    const cif = req.params.cif
    const {body} = req
    const dato = await comercioModel.findOneAndDelete({cif: cif}, body)
    res.send(dato)
};

// Exporto todas las variables que se han creado
module.exports = {getComercio, getComercioCIF, getTodo, postComercio, putComercio, deleteComercio}