/**
* Obtener lista de la base de datos
* @param {*} req
* @param {*} res
*/
// Importamos el módulo 'express' para crear el servidor y manejar las rutas
const express = require('express');

// Importamos el modelo 'comercioModel' desde el archivo '../models'
const {comercioModel} = require('../models')

// Definimos una función asíncrona para obtener comercios ordenados por CIF
const getComercioCIF = async (req, res) => {
    try {
        // Obtenemos el parámetro 'ordenar' de la query string
        const {ordenar} = req.query
        // Buscamos todos los comercios y los ordenamos por CIF (ascendente por defecto)
        const data = await comercioModel.find().sort({cif:ordenar||1})
        // Enviamos los datos obtenidos como respuesta
        res.send(data)
    } catch (err) {
        // En caso de error, enviamos el mensaje de error
        res.send({err: err.message})
    }
}

// Definimos una función asíncrona para obtener todos los comercios ordenados
const getTodo = async (req, res) => {
    try {
        // Obtenemos el parámetro 'ordenar' de la query string
        const {ordenar} = req.query; 
        // Buscamos todos los comercios y los ordenamos por CIF (ascendente por defecto)
        const dato = await comercioModel.find().sort({ CIF: ordenar || 1 });
        // Enviamos los datos obtenidos como respuesta con un estado 200
        res.status(200).json(dato);
    } catch (error) {
        // En caso de error, enviamos el mensaje de error con un estado 500
        res.status(500).json({error: error.message});
    }
}

// Definimos una función asíncrona para obtener un comercio por su CIF
const getComercio = async (req, res) => {
    // Obtenemos el parámetro 'cif' de los parámetros de la ruta
    const cif = req.params.cif
    // Buscamos el comercio con el CIF especificado
    const dato = await comercioModel.find({ cif: cif })
    // Enviamos los datos obtenidos como respuesta
    res.send(dato)
}

// Definimos una función asíncrona para crear un nuevo comercio
const postComercio = async (req, res) => {
    // Obtenemos el cuerpo de la solicitud
    const {body} = req
    // Creamos un nuevo comercio con los datos del cuerpo de la solicitud
    const dato = await comercioModel.create(body)
    // Enviamos los datos del comercio creado como respuesta
    res.send(dato)
}

// Definimos una función asíncrona para modificar un comercio por su CIF
const putComercio = async (req, res) => {
    // Obtenemos el parámetro 'cif' de los parámetros de la ruta
    const cif = req.params.cif
    // Obtenemos el cuerpo de la solicitud
    const {body} = req
    // Buscamos y actualizamos el comercio con el CIF especificado, devolviendo el nuevo documento
    const dato = await comercioModel.findOneAndUpdate({ cif: cif }, body, {new: true})
    // Enviamos los datos del comercio actualizado como respuesta
    res.send(dato)
}

// Definimos una función asíncrona para eliminar un comercio por su CIF
const deleteComercio = async (req, res) => {
    // Obtenemos el parámetro 'cif' de los parámetros de la ruta
    const cif = req.params.cif
    // Obtenemos el cuerpo de la solicitud (aunque no se usa en este caso)
    const {body} = req
    // Buscamos y eliminamos el comercio con el CIF especificado
    const dato = await comercioModel.findOneAndDelete({cif: cif}, body)
    // Enviamos los datos del comercio eliminado como respuesta
    res.send(dato)
};

// Exportamos todas las funciones definidas para que puedan ser usadas en otros archivos
module.exports = {getComercio, getComercioCIF, getTodo, postComercio, putComercio, deleteComercio}