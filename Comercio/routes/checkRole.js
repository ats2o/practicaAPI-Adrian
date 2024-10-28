const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { checkRole, checkOwnResource, checkComercioOwnership } = require('../middleware/checkRole');
const userController = require('../controller/auth');
const comercioController = require('../controller/comercio');
const webController = require('../controller/web');
const someController = require('../controller/someResource');

// Ruta que solo pueden acceder los administradores
router.post('/comercios', 
    authMiddleware, 
    checkRole(['admin']), 
    comercioController.createComercio
);

// Ruta donde un usuario solo puede acceder a sus propios datos
router.put('/users/:id', 
    authMiddleware, 
    checkOwnResource('id'), 
    userController.updateUser
);

// Ruta donde un comercio solo puede modificar su propia web
router.put('/comercios/:cif/web', 
    authMiddleware, 
    checkComercioOwnership('cif'), 
    webController.updateWeb
);

// Ruta que pueden acceder tanto admins como users
router.get('/some-resource', 
    authMiddleware, 
    checkRole(['admin', 'user']), 
    someController.getResource
);