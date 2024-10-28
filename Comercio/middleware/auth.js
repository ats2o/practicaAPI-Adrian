const jwt = require('jsonwebtoken');
const { handleHttpERROR } = require('../utils/handleError');
const { userModel } = require('../models');

/**
 * Middleware para verificar el token JWT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const authMiddleware = async (req, res, next) => {
    try {
        // Verificar si hay header de autorización
        if (!req.headers.authorization) {
            return handleHttpERROR(res, "NO_TOKEN", 401);
        }
        // Obtener el token del header (Bearer token)
        const token = req.headers.authorization.split(' ').pop();
        // Verificar que el token existe
        if (!token) {
            return handleHttpERROR(res, "NO_TOKEN", 401);
        }
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Verificar que el token contiene un id de usuario
        if (!decodedToken._id) {
            return handleHttpERROR(res, "ERROR_ID_TOKEN", 401);
        }
        // Buscar el usuario en la base de datos
        const user = await userModel.findById(decodedToken._id);
        // Verificar que el usuario existe
        if (!user) {
            return handleHttpERROR(res, "USER_NOT_EXISTS", 401);
        }
        // Añadir el usuario al objeto request para uso posterior
        req.user = user;
        // Continuar con la siguiente función
        next();
    } catch (error) {
        return handleHttpERROR(res, "NOT_AUTHORIZED", 401);
    }
};

/**
 * Middleware para verificar el token de comercio
 */

const authComercioMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return handleHttpERROR(res, "NO_TOKEN", 401);
        }
        const token = req.headers.authorization.split(' ').pop();
        if (!token) {
            return handleHttpERROR(res, "NO_TOKEN", 401);
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Verificar que el token contiene un CIF de comercio
        if (!decodedToken.cif) {
            return handleHttpERROR(res, "ERROR_CIF_TOKEN", 401);
        }
        // Buscar el comercio en la base de datos
        const comercio = await comercioModel.findOne({ cif: decodedToken.cif });
        if (!comercio) {
            return handleHttpERROR(res, "COMERCIO_NOT_EXISTS", 401);
        }
        // Añadir el comercio al objeto request
        req.comercio = comercio;
        next();
    } catch (error) {
        return handleHttpERROR(res, "NOT_AUTHORIZED", 401);
    }
};

/**
 * Middleware para verificar roles
 * @param {Array} roles Array de roles permitidos
 */

const checkRole = (roles) => async (req, res, next) => {
    try {
        const user = req.user;
        // Verificar que el usuario existe y tiene un rol
        if (!user || !user.role) {
            return handleHttpERROR(res, "NOT_AUTHORIZED", 401);
        }
        // Verificar si el rol del usuario está en el array de roles permitidos
        const hasRole = roles.includes(user.role);
        if (!hasRole) {
            return handleHttpERROR(res, "NOT_AUTHORIZED_ROLE", 403);
        }
        next();
    } catch (error) {
        return handleHttpERROR(res, "ERROR_CHECK_ROLE", 401);
    }
};

module.exports = { authMiddleware, authComercioMiddleware, checkRole };