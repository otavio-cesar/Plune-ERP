const fetch = require("node-fetch");
const apiUrl = 'https://solucao-teste10.plune.com.br/'
const users = 'REST/Company.CompanyUsers/Browse'
const orders = 'JSON/PCP.OrdemProducaoItem/Browse'

const cookie = "UltraClassLogin=teste10:Ultra.Users:rodrigo-maximo@hotmail.com:@8vP-n9M2gbDdWMlLBu0ZaDgUJX6yVm51AnZRgBBv2lE8e52Cu3RYM9WBxcKIsBh90DETHI02zwLdzo_JMS8kkQ:pt_br:::992"

class PluneERPService {

    constructor() { }

    async getUsers() {
        const res = await fetch(`${apiUrl}${users}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getOrders(params = 'PCP.OrdemProducaoItem.ProdutoId=2026') {
        const res = await fetch(`${apiUrl}${orders}?${params}`, {
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