const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

/**
 * Validador para el registro de usuario
 */
const validateRegister = [
    check("nombre").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 6 }),
    (req, res, next) => validateResults(req, res, next)
];

/**
 * Validador para el inicio de sesión de usuario
 */
const validateLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

/**
 * Validador para la actualización del perfil de usuario
 */
const validateUpdateProfile = [
    check("nombre").optional().isString(),
    check("email").optional().isEmail(),
    check("password").optional().isLength({ min: 6 }),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validateRegister, validateLogin, validateUpdateProfile };