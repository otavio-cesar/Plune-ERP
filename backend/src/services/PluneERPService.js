const fetch = require("node-fetch");
const apiUrl = 'https://solucao-teste10.plune.com.br/'
const user = 'REST/Company.CompanyUsers/Browse'
const order = 'JSON/PCP.OrdemProducaoItem/Browse'
const linha = 'JSON/PCP.UsuarioPCPLinhaProducao/Browse'
const stage = 'JSON/PCP.OrdemProducaoItemProcessoProdutivo/Browse'

const cookie = "UltraClassLogin=teste10:Ultra.Users:rodrigo-maximo@hotmail.com:@8vP-n9M2gbDdWMlLBu0ZaDgUJX6yVm51AnZRgBBv2lE8e52Cu3RYM9WBxcKIsBh90DETHI02zwLdzo_JMS8kkQ:pt_br:::992"

class PluneERPService {

    constructor() { }

    async getUsers() {
        const res = await fetch(`${apiUrl}${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getOrders(params) {
        let _params = ''
        if (params.ProdutoId) {
            _params = `PCP.OrdemProducaoItem.ProdutoId=${params.ProdutoId}&`
        }
        if (params.Ids) {
            _params = `PCP.OrdemProducaoItem.Id=${params.Ids.join(',')}&`
            _params += `PCP.OrdemProducaoItem.BrowseLimit=0&`
        }
        const res = await fetch(`${apiUrl}${order}?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getStage(params) {
        let _params = ''
        if (params.LinhaProcessoProdutivoIds) {
            _params = `PCP.OrdemProducaoItemProcessoProdutivo.LinhaProcessoProdutivoId=${params.LinhaProcessoProdutivoIds}&`
            _params += `PCP.OrdemProducaoItemProcessoProdutivo.BrowseLimit=0&`
        }
        if (params.OrdemId) {
            _params += `PCP.OrdemProducaoItemProcessoProdutivo.OrdemId=${params.OrdemId}&`
            _params += `PCP.OrdemProducaoItemProcessoProdutivo.BrowseLimit=0&`
            _params += `_PCP.OrdemProducaoItemProcessoProdutivo.OrderDesc=0&`
            _params += `_PCP.OrdemProducaoItemProcessoProdutivo.Order=ProcessoId&`
        }
        const res = await fetch(`${apiUrl}${stage}?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getProductionLine(params) {
        let _params = ''
        if (params.UserPCPId) {
            _params = `PCP.UsuarioPCPLinhaProducao.UserPCPId=${params.UserPCPId}&`
        }
        const res = await fetch(`${apiUrl}${linha}?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

}

module.exports = PluneERPService