// Este archivo "comercio.js" su funcion es ejecutar las variables de la carpeta (controller/user)
const express = require('express') // Importo la funcion express

// Importo todas las variables del archivo user de la carpeta controller para usarlas mas tarde
const {getComercio, getTodo, postComercio, putComercio, deleteComercio} = require('../controller/comercio')

// Creo la variable comercio que se va a encargar mas tarde poder hacer las llamadas de peticion
const comercio = express.Router()

// GET 
comercio.get('/', getTodo); 

// filtra unicamente por un unico comercio (CIF)
comercio.get('/:cif', getComercio); 

// POST 
comercio.post('/', postComercio);

// PUT
comercio.put('/:cif', putComercio);

// DELETE  
comercio.delete('/:cif', deleteComercio);

// Exporto la variable comercio para que pueda usarse en otros archivos
module.exports = comercio;