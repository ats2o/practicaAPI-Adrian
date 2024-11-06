const { userModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpERROR } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')

const getAllUser = async (req, res) => {
    try {
        const data = await userModel.find()
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERRO_GET_USERS', 403)
    }
}

const register = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req,password}
        const dataUser = await userModel.create(body) 
        dataUser.set('password', undefined, { strict: false })
        const data = {
        token: await tokenSign(dataUser),
        user: dataUser
        }
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, "ERROR_REGISTER_USER")
    }
}

const login = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await userModel.findOne({ email: req.email }).select("password name role email")
        if (!user) {
            handleHttpERROR(res, "USER_NOT_EXISTS", 404)
            return
        }
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
        if (!check) {
            handleHttpERROR(res, "INVALID_PASSWORD", 401)
            return
        }
        user.set("password", undefined, { strict: false })
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, "ERROR_LOGIN_USER")
    }
}

const UpdateUser = async (req, res) => {
    try {
        const id = req.params.id
        const body = matchedData(req)
        if (body.password) {
            const password = await encrypt(body.password)
            body.password = password
        }
        const data = await userModel.findByIdAndUpdate(id, body, {new:true, select: '-password'})
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_UPDATE_USER', 403)
    }
}

const DeleteUser = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await userModel.deleteOne({_id:id})
        res.send(data)
    } catch (err) {
        handleHttpERROR(res, 'ERROR_DELETE_USER', 403)
    }
}

module.exports = { getAllUser, register, login, UpdateUser, DeleteUser }