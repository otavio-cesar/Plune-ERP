const express = require('express');

const routes = express.Router();
const usuarioRoutes = require('./routes/Usuario')

routes.use('/usuario', usuarioRoutes)

module.exports = routes;