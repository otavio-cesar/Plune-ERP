import { urlAPI } from "../util/constants"

export async function getStagesByIdOrder(id) {
    const res = await fetch(`${urlAPI}stage/order/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res.json()
}

export async function patchStageSituation(OrdemId, ProcessoId, ProdutoId, Status, MotivoParadaId = null) {
    const res = await fetch(`${urlAPI}stage/pathStageSituation`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrdemId: OrdemId, ProcessoId: ProcessoId, ProdutoId: ProdutoId, Status: Status, MotivoParadaId: MotivoParadaId })
    })
    if (res.status == 201)
        return res.json()
    else
        throw new Error((await res.json()).message)
}