const { handleHttpERROR } = require('../utils/handleError');

/**
 * Middleware para verificar roles de usuario
 * @param {Array} roles Array de roles permitidos
 * @returns {Function} Middleware
 */

const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Verificar que existe un usuario en el request (puesto por authMiddleware)
            if (!req.user) {
                return handleHttpERROR(res, "NO_USER_SESSION", 401);
            }
            // Obtener el rol del usuario
            const userRole = req.user.role;
            // Verificar si el rol del usuario está en los roles permitidos
            const hasPermission = allowedRoles.includes(userRole);
            if (!hasPermission) {
                return handleHttpERROR(res, "USER_NOT_AUTHORIZED_FOR_THIS_ACTION", 403);
            }
            // Si todo está bien, continuar
            next();
        } catch (error) {
            handleHttpERROR(res, "ERROR_CHECKING_ROLE", 500);
        }
    };
};

/**
 * Middleware para verificar que el usuario solo accede a sus propios recursos
 * @param {String} paramId Nombre del parámetro que contiene el ID del recurso
 */

const checkOwnResource = (paramId = 'id') => {
    return async (req, res, next) => {
        try {
            // Verificar que existe un usuario en el request
            if (!req.user) {
                return handleHttpERROR(res, "NO_USER_SESSION", 401);
            }
            // Obtener el ID del recurso de los parámetros
            const resourceId = req.params[paramId];
            // Si el usuario es admin, permitir acceso
            if (req.user.role === 'admin') {
                return next();
            }
            // Verificar si el recurso pertenece al usuario
            if (resourceId !== req.user._id.toString()) {
                return handleHttpERROR(res, "NOT_ALLOWED_TO_ACCESS_THIS_RESOURCE", 403);
            }
            next();
        } catch (error) {
            handleHttpERROR(res, "ERROR_CHECKING_RESOURCE_OWNERSHIP", 500);
        }
    };
};

/**
 * Middleware para verificar permisos de comercio
 * @param {String} paramId Nombre del parámetro que contiene el CIF del comercio
 */

const checkComercioOwnership = (paramId = 'cif') => {
    return async (req, res, next) => {
        try {
            // Verificar que existe un comercio en el request
            if (!req.comercio) {
                return handleHttpERROR(res, "NO_COMERCIO_SESSION", 401);
            }
            // Obtener el CIF del recurso de los parámetros
            const comercioCIF = req.params[paramId];
            // Verificar si el recurso pertenece al comercio
            if (comercioCIF !== req.comercio.cif) {
                return handleHttpERROR(res, "NOT_ALLOWED_TO_ACCESS_THIS_RESOURCE", 403);
            }
            next();
        } catch (error) {
            handleHttpERROR(res, "ERROR_CHECKING_COMERCIO_OWNERSHIP", 500);
        }
    };
};

module.exports = { checkRole, checkOwnResource, checkComercioOwnership };