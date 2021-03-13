import { urlAPI } from "../util/constants"
import EnumPermissions from "../util/EnumPermissions"

export async function getOrdens() {
    const res = await fetch(`${urlAPI}ordem`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res.json()
}

export async function getOrdensByLineProduction(LinhaProcessoProdutivoIds) {
    const res = await fetch(`${urlAPI}ordem/LineProduction`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            LinhaProcessoProdutivoIds
        },
    })
    return res.json()
}