const fetch = require("node-fetch");
const apiUrl = 'https://solucao-teste10.plune.com.br/'
const users = 'REST/Company.CompanyUsers/Browse'
const oders = 'REST/Company.CompanyUsers/Browse'
class PluneERPService {

    constructor() { }

    async getUsers() {
        const res = await fetch(`${apiUrl}${users}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: "UltraClassLogin=teste10:Ultra.Users:rodrigo-maximo@hotmail.com:@x2Phm_QP9cwtzsR9cCOREiSioJVRuqvVaPjBUmS3zBTf9xFpePTnsROQWz74iheLYyBFr_TcjPzBbJ0dLY1keA"
            },
        })
        return (await res.json()).data.row
    }

    async getOrders() {
        const res = await fetch(`${apiUrl}${users}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: "UltraClassLogin=teste10:Ultra.Users:rodrigo-maximo@hotmail.com:@x2Phm_QP9cwtzsR9cCOREiSioJVRuqvVaPjBUmS3zBTf9xFpePTnsROQWz74iheLYyBFr_TcjPzBbJ0dLY1keA"
            },
        })
        return await res.json()
    }

}

module.exports = PluneERPService