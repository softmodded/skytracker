

export async function makeAuthenticatedRequest(endpoint: String, jwt: String) {
    const response = await fetch(`${endpoint}`, {
        // @ts-ignore
        headers: {
            "ST-Auth-Token": jwt
        }
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.status}`)
    }

    return response.json()
}

export async function makeAuthenticatedPostRequest(endpoint: String, jwt: String, body: Object) {
    const response = await fetch(`${endpoint}`, {
        // @ts-ignore
        headers: {
            "ST-Auth-Token": jwt
        },

        method: "POST",
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.status}`)
    }

    return response.json()
}

