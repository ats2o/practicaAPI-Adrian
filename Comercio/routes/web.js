// Este archivo "web.js" su funcion es ejecutar las variables de la carpeta (controller/web)
const express = require('express') // Importo la funcion express
const { getItems, getItem, createItem, updateItem, deleteItem, deleteItemLogical} = require('../controller/web')

// Importo todas las variables del archivo web de la carpeta controller para usarlas mas tarde
const { validateGetItem, validateCreateItem } = require('../validators/web')

// Importo los validadores para verificaciones como en el (GET, POST, PUT, DELETE)
const web = express.Router()
// Creo la variable comercio que se va a encargar mas tarde poder hacer las llamadas de peticion

// GET
web.get('/', getItems)
web.get('/:id', validateGetItem, getItem) // Obtinene la web por su id

// POST
web.post('/', validateCreateItem, createItem)

// PUT
web.put('/:id', validateGetItem, validateCreateItem, updateItem)

// DELETE
web.delete('/:id', validateGetItem, deleteItem)
web.delete('/logical/:id', validateGetItem, deleteItemLogical)

// Exporto la variable web para que pueda usarse en otros archivos
module.exports = web