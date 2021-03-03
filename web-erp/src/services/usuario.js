import { urlAPI } from "../util/constants"

export async function getUsers(username, password) {
    const res = await fetch(`${urlAPI}usuario/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
    })
    return res
}