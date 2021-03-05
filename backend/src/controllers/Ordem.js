// const { Ordem } = require("../db/models/index");
// var jwt = require("jsonwebtoken");
// const EnumPermissao = require("../util/EnumPermissao");
// const OrdemService = require("../services/Ordem");
// const constants = require("../util/constants.json");

// const ordemService = new OrdemService(Ordem);

const pluneERPService = new PluneERPService()

module.exports = {

  async getOrdemPlune(req, res) {
    let orderns = pluneERPService.getOrders()
    return res.json(orderns);
  }

};