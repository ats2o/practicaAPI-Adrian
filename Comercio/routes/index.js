const express = require('express') // Importo la función express
const fs = require('fs') // Importo la función fs
const comercio = express.Router() // Creo un enrutador usando express

// Función para remover la extensión de un archivo
const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

// Leer los archivos en el directorio actual y filtrar
fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file) // Remover la extensión del archivo
    if (name !== 'index') {
        // Usar el enrutador para cada archivo excepto index.js
        comercio.use('/' + name, require('./' + name)) // http://localhost:4000/api/
    }
});

const router = express.Router();
router.use('/someResource', require('./someResource'));
module.exports = router;