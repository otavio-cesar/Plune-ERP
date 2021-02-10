const express = require('express');
const UsuarioController = require('../controllers/Usuario');

const usuario = express.Router();
// const auth = require('./Autorize')
// const EnumPermissao = require('../util/EnumPermissao');

usuario.post('/login', UsuarioController.login);

// usuario.post(
//     '/login_validate',
//     (req, res, next) =>
//         auth.Authorize(req, res, next, [EnumPermissao.Admin, EnumPermissao.Lojista, EnumPermissao.Basic]),
//     UsuarioController.loginValidate
// );

// usuario.put('/:id',
//     (req, res, next) => auth.Authorize(req, res, next, [EnumPermissao.Admin, EnumPermissao.Lojista, EnumPermissao.Basic]),
//     UsuarioController.updateUsuario);

module.exports = usuario;