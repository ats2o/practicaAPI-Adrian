const { handleHttpERROR } = require('../utils/handleError') // Importa la función handleHttpERROR del módulo handleError

const CheckRol = (role) => (req, res, next) => { // Define la función middleware CheckRol que toma un parámetro role
    try {
        const { user } = req // Extrae el objeto user de la solicitud (request)
        const userRol = user.role // Obtiene el rol del usuario
        const checkvalueRol = role.includes(userRol) // Verifica si el rol del usuario está incluido en los roles permitidos
        if (!checkvalueRol) { // Si el rol del usuario no está permitido
            handleHttpERROR(res, 'NOT_ALLOWED', 403) // Envía una respuesta 403 Forbidden con el mensaje de error 'NOT_ALLOWED'
            return // Sale de la función middleware
        }
        next() // Si el rol del usuario está permitido, procede a la siguiente función middleware
    } catch (err) { // Si ocurre un error
        handleHttpERROR(res, 'ERROR_PERMISSIONS', 403) // Envía una respuesta 403 Forbidden con el mensaje de error 'ERROR_PERMISSIONS'
    }
}

module.exports = CheckRol // Exporta la función middleware CheckRol