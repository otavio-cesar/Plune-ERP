const express = require('express');
const OrdemController = require('../controllers/Ordem');

const ordem = express.Router();

ordem.get('/plune', OrdemController.getOrdemPlune);

module.exports = ordem;