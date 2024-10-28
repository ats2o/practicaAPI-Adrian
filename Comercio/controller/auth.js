const { userModel } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleHttpERROR } = require('../utils/handleError');
const { matchedData } = require('express-validator');

/**
 * Registrar un nuevo usuario
 * @param {*} req
 * @param {*} res
 */

const register = async (req, res) => {
    try {
        // Obtener los datos validados
        const body = matchedData(req);
        
        // Verificar si el email ya existe
        const existingUser = await userModel.findOne({ email: body.email });
        if (existingUser) {
            return handleHttpERROR(res, "EMAIL_ALREADY_EXISTS", 400);
        }
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        // Crear el nuevo usuario
        const newUser = await userModel.create(body);
        // Eliminar la contraseña del objeto de respuesta
        newUser.set('password', undefined, { strict: false });
        // Generar token JWT
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(201).send({ data: newUser, token });
    } catch (error) {
        handleHttpERROR(res, "ERROR_REGISTER_USER");
    }
};

/**
 * Login de usuario
 * @param {*} req
 * @param {*} res
 */

const login = async (req, res) => {
    try {
        const body = matchedData(req);
        // Buscar usuario por email
        const user = await userModel.findOne({ email: body.email });
        if (!user) {
            return handleHttpERROR(res, "USER_NOT_EXISTS", 404);
        }
        // Verificar contraseña
        const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
        if (!isPasswordCorrect) {
            return handleHttpERROR(res, "PASSWORD_INCORRECT", 401);
        }
        // Generar token JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        // Eliminar la contraseña del objeto de respuesta
        user.set('password', undefined, { strict: false });
        res.send({ data: user, token });
    } catch (error) {
        handleHttpERROR(res, "ERROR_LOGIN_USER");
    }
};

/**
 * Obtener perfil del usuario
 * @param {*} req
 * @param {*} res
 */

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        user.set('password', undefined, { strict: false });
        res.send({ data: user });
    } catch (error) {
        handleHttpERROR(res, "ERROR_GET_PROFILE");
    }
};

/**
 * Actualizar perfil del usuario
 * @param {*} req
 * @param {*} res
 */

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const body = matchedData(req);
        // Si se intenta actualizar el email, verificar que no exista ya
        if (body.email) {
            const existingUser = await userModel.findOne({ email: body.email, _id: { $ne: userId } });
            if (existingUser) {
                return handleHttpERROR(res, "EMAIL_ALREADY_EXISTS", 400);
            }
        }
        // Si se intenta actualizar la contraseña, hashearla
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, body, { new: true });
        updatedUser.set('password', undefined, { strict: false });
        res.send({ data: updatedUser });
    } catch (error) {
        handleHttpERROR(res, "ERROR_UPDATE_PROFILE");
    }
};

/**
 * Eliminar cuenta de usuario
 * @param {*} req
 * @param {*} res
 */

const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        await userModel.findByIdAndDelete(userId);
        res.send({ message: "USER_DELETED_SUCCESSFULLY" });
    } catch (error) {
        handleHttpERROR(res, "ERROR_DELETE_ACCOUNT");
    }
};

module.exports = { register, login, getProfile, updateProfile, deleteAccount };