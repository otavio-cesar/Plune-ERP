const PluneERPService = require("../services/PluneERPService");

const pluneERPService = new PluneERPService()

module.exports = {

  async getOrdemPlune(req, res) {
    let ordens = await pluneERPService.getOrders({})
    return res.json(ordens);
  },

  async getOrdemPluneByLineProduction(req, res) {
    const { linhaprocessoprodutivoids } = req.headers
    let ordens
    const data = await pluneERPService.getStage({ LinhaProcessoProdutivoIds: linhaprocessoprodutivoids })
    const stages = data.data.row
    if (stages.length > 0) {
      let Ids = stages.map(s => s.OrdemId.value)
      ordens = await pluneERPService.getOrders({ Ids })
    } else {
      ordens = { data: { row: [] } }
    }
    return res.json(ordens);
  },

};