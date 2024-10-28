// Este archivo "comercio.js" en validators se va a encargar de a la hora de las peticiones validarlas
const { check } = require('express-validator') // Importo la funcion check
const validateResults = require('../utils/handleValidator')
// Importo este archivo que validara que todos los resultados qeu se quieran mandar estan bien

// Creo una variable constante que validara las creaciones de webs
const validateCreateItem = [
    check("Ciudad").exists().notEmpty().isString(),
    check("Actividad").exists().notEmpty().isString(),
    check("Titulo").exists().notEmpty().isString(),
    check("Resumen").exists().notEmpty().isString(),
    check("Array_textos").exists(),
    check("Array_imagenes").exists(),
    check("resenas_user").exists().notEmpty(),
    check("resenas_user.Scoring").exists().notEmpty(),
    check("resenas_user.Numero_puntuaciones").exists().notEmpty(),
    check("resenas_user.Resenas").exists().notEmpty().isString(),
    (req, res, next) => validateResults(req, res, next)
]

// Creo una variable constante que validara el id de las webs
const validateGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]

const validateUpdateItem = [
    check("id").exists().notEmpty().isMongoId(),
    check("Ciudad").optional().isString(),
    check("Actividad").optional().isString(),
    check("Titulo").optional().isString(),
    check("Resumen").optional().isString(),
    check("Array_textos").optional().isArray(),
    check("Array_imagenes").optional().isArray(),
    check("resenas_user").optional(),
    check("resenas_user.Scoring").optional().isNumeric().isInt({ min: 0, max: 5 }),
    check("resenas_user.Numero_puntuaciones").optional().isNumeric(),
    check("resenas_user.Resenas").optional().isString(),
    (req, res, next) => validateResults(req, res, next)
];

// Exporto las variables validateGetItem y validateCreateItem para que pueda usarse en otros archivos
module.exports = { validateCreateItem, validateGetItem, validateUpdateItem}