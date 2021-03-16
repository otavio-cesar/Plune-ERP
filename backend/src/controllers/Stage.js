const PluneERPService = require("../services/PluneERPService");

const pluneERPService = new PluneERPService()

module.exports = {

  async getStagePluneByIdOrder(req, res) {
    const { id } = req.params
    const stages = await pluneERPService.getStage({ OrdemId: id })
    return res.json(stages);
  },

  async patchStageSituation(req, res) {
    const { id } = req.params
    const stages = await pluneERPService.getStage({ OrdemId: id })
    return res.json(stages);
  }

};