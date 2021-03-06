const express = require('express');

const routes = express.Router();
const usuarioRoutes = require('./routes/Usuario')
const ordemRoutes = require('./routes/Ordem')

routes.use('/usuario', usuarioRoutes)
routes.use('/ordem', ordemRoutes)

module.exports = routes;