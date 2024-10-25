// Este archivo "storage.js" su funcion es ejecutar las variables de la carpeta (controller/storage)
const express = require('express') // Importo la funcion express
const { push, createItem, deleteItem, deleteItemLogical } = require('../controller/storage')

// Importo todas las variables del archivo storage de la carpeta controller para usarlas mas tarde
const uploadMiddleware = require('../utils/handleStorage') 
// Importo el archivo que verificara cunado haya que hacer un post que esten bien los campos
const { validateGetItem } = require('../validators/web')

// Importo los validadores para verificaciones como en el (PATCH, DELETE)
const storage = express.Router()

// Creo la variable storage que se va a encargar mas tarde poder hacer las llamadas de peticion

// POST
storage.post('/', uploadMiddleware.single("image"), createItem)

// PATCH
storage.patch('/:id', validateGetItem, push)

// DELETE
storage.delete('/:id', validateGetItem, deleteItem) 
storage.delete('/logical/:id', validateGetItem, deleteItemLogical)

// Exporto la variable storage para que pueda usarse en otros archivos
module.exports = storage