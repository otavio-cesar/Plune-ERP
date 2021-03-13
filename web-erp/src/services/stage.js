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