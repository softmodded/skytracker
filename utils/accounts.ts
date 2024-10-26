export async function makeAuthenticatedRequest(endpoint: String, jwt: String) {
    const response = await fetch(`http://localhost:3000${endpoint}`, {
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