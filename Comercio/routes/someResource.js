const express = require('express');
const router = express.Router();
const someResourceController = require('../controllers/someResource');
const { authMiddleware } = require('../middleware/auth');
const { validateCreateResource, validateUpdateResource, validateGetResource } = require('../validators/someResource');

// Obtener todos los recursos (con paginación, filtros y ordenamiento)
router.get('/', someResourceController.getAllResources);

// Búsqueda avanzada de recursos
router.get('/search', someResourceController.searchResources);

// Obtener un recurso específico por ID
router.get('/:id', validateGetResource, someResourceController.getResource);

// Crear un nuevo recurso (requiere autenticación)
router.post('/', authMiddleware, validateCreateResource, someResourceController.createResource);

// Actualizar un recurso existente (requiere autenticación)
router.put('/:id', authMiddleware, validateUpdateResource, someResourceController.updateResource);

// Eliminar un recurso (requiere autenticación)
router.delete('/:id', authMiddleware, validateGetResource, someResourceController.deleteResource);

module.exports = router;