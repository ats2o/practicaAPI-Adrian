const { someResourceModel } = require('../models/nosql/someResource'); // Asegúrate de crear este modelo
const { handleHttpERROR } = require('../utils/handleError');
const { matchedData } = require('express-validator');

/**
 * Obtener todos los recursos
 * @param {*} req
 * @param {*} res
 */

const getAllResources = async (req, res) => {
    try {
        // Implementar paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Implementar filtros
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.status) filters.status = req.query.status;
        // Implementar ordenamiento
        const sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }
        const [resources, total] = await Promise.all([
            someResourceModel
                .find(filters)
                .skip(skip)
                .limit(limit)
                .sort(sort),
            someResourceModel.countDocuments(filters)
        ]);
        res.send({
            data: resources,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        handleHttpERROR(res, "ERROR_GET_RESOURCES");
    }
};

/**
 * Obtener un recurso específico
 * @param {*} req
 * @param {*} res
 */

const getResource = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const resource = await someResourceModel.findById(id);
        
        if (!resource) {
            return handleHttpERROR(res, "RESOURCE_NOT_FOUND", 404);
        }
        res.send({ data: resource });
    } catch (error) {
        handleHttpERROR(res, "ERROR_GET_RESOURCE");
    }
};

/**
 * Crear un nuevo recurso
 * @param {*} req
 * @param {*} res
 */

const createResource = async (req, res) => {
    try {
        const body = matchedData(req);
        const createdBy = req.user._id; // Asume que tienes el usuario en req después de la autenticación
        
        const resource = await someResourceModel.create({
            ...body,
            createdBy
        });
        res.status(201).send({ data: resource });
    } catch (error) {
        handleHttpERROR(res, "ERROR_CREATE_RESOURCE");
    }
};

/**
 * Actualizar un recurso existente
 * @param {*} req
 * @param {*} res
 */

const updateResource = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const resource = await someResourceModel.findById(id);
        
        if (!resource) {
            return handleHttpERROR(res, "RESOURCE_NOT_FOUND", 404);
        }
        // Verificar si el usuario tiene permiso para actualizar
        if (resource.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return handleHttpERROR(res, "NOT_AUTHORIZED_TO_UPDATE", 403);
        }
        const updatedResource = await someResourceModel.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );
        res.send({ data: updatedResource });
    } catch (error) {
        handleHttpERROR(res, "ERROR_UPDATE_RESOURCE");
    }
};

/**
 * Eliminar un recurso
 * @param {*} req
 * @param {*} res
 */

const deleteResource = async (req, res) => {
    try {
        const { id } = matchedData(req);
        
        const resource = await someResourceModel.findById(id);
        
        if (!resource) {
            return handleHttpERROR(res, "RESOURCE_NOT_FOUND", 404);
        }

        // Verificar si el usuario tiene permiso para eliminar
        if (resource.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return handleHttpERROR(res, "NOT_AUTHORIZED_TO_DELETE", 403);
        }

        await someResourceModel.findByIdAndDelete(id);
        
        res.send({ message: "RESOURCE_DELETED_SUCCESSFULLY" });
    } catch (error) {
        handleHttpERROR(res, "ERROR_DELETE_RESOURCE");
    }
};

/**
 * Búsqueda avanzada de recursos
 * @param {*} req
 * @param {*} res
 */

const searchResources = async (req, res) => {
    try {
        const { query, category, startDate, endDate } = req.query;
        
        const searchQuery = {};
        
        // Búsqueda por texto
        if (query) {
            searchQuery.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        // Filtro por categoría
        if (category) {
            searchQuery.category = category;
        }
        // Filtro por fecha
        if (startDate || endDate) {
            searchQuery.createdAt = {};
            if (startDate) searchQuery.createdAt.$gte = new Date(startDate);
            if (endDate) searchQuery.createdAt.$lte = new Date(endDate);
        }
        const resources = await someResourceModel.find(searchQuery);
        
        res.send({ data: resources });
    } catch (error) {
        handleHttpERROR(res, "ERROR_SEARCH_RESOURCES");
    }
};

module.exports = { getAllResources, getResource, createResource, updateResource, deleteResource, searchResources };