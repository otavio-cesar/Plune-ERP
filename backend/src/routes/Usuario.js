const express = require('express');
const UsuarioController = require('../controllers/Usuario');

const usuario = express.Router();

usuario.post('/login', UsuarioController.login);

usuario.get('/plune', UsuarioController.getUsersPlune);

module.exports = usuario;