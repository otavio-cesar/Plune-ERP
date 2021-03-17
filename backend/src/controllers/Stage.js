const PluneERPService = require("../services/PluneERPService");

const pluneERPService = new PluneERPService()

module.exports = {

  async getStagePluneByIdOrder(req, res) {
    const { id } = req.params
    const stages = await pluneERPService.getStage({ OrdemId: id })
    return res.json(stages);
  },

  async patchStageSituation(req, res) {
    try {
      const { OrdemId, ProcessoId, ProdutoId, Status, MotivoParadaId } = req.body
      const stages = await pluneERPService.patchStageSituation({ OrdemId, ProcessoId, ProdutoId, Status, MotivoParadaId })
      if (!stages.ErrorStatus2)
        return res.status(201).json(stages);
      else
        return res.status(400).json({ message: 'Erro ao atualizar', detail: stages.ErrorStatus });
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

};