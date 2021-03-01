const apiUrl = 'https://solucao-teste10.plune.com.br/'
const users = 'REST/Company.CompanyUsers/Browse'

export class PluneERPService {

    async getUsers() {
        const res = await fetch(`${apiUrl}${users}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
        })
        return res.json()
    }

}