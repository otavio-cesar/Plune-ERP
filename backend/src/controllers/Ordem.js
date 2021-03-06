const PluneERPService = require("../services/PluneERPService");

const pluneERPService = new PluneERPService()

module.exports = {

  async getOrdemPlune(req, res) {
    let ordens = await pluneERPService.getOrders()
    return res.json(ordens);
  }

};