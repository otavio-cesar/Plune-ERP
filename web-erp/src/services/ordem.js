import { urlAPI } from "../util/constants"

export async function getOrdens() {
    const res = await fetch(`${urlAPI}ordem/plune`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res.json()
}