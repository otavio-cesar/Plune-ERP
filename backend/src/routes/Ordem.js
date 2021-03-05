const express = require('express');
const OrdemController = require('../controllers/Ordem');

const ordem = express.Router();
// const auth = require('./Autorize')
// const EnumPermissao = require('../util/EnumPermissao');

ordem.get('/ordemPlune', OrdemController.getOrdemPlune);

// usuario.post(
//     '/login_validate',
//     (req, res, next) =>
//         auth.Authorize(req, res, next, [EnumPermissao.Admin, EnumPermissao.Lojista, EnumPermissao.Basic]),
//     UsuarioController.loginValidate
// );

// usuario.put('/:id',
//     (req, res, next) => auth.Authorize(req, res, next, [EnumPermissao.Admin, EnumPermissao.Lojista, EnumPermissao.Basic]),
//     UsuarioController.updateUsuario);

module.exports = ordem;