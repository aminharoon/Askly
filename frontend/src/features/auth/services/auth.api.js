const baseURI = 'http://localhost:3000/api/auth'

export const register = async ({ username, email, password }) => {
    const res = await fetch(`${baseURI}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })

    if (!res.ok) {
        const err = await res.json().catch(() => { })
        throw new Error(err.message || `something went wrong ${res.status}`)
    }
    const response = await res.json()
    return response.data

}

export const login = async ({ email, password }) => {
    const res = await fetch(`${baseURI}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        const err = await res.json().catch(() => { })
        throw new Error(err.message || `something went wrong ${res.status}`)
    }
    const response = await res.json()

    return response.data

}
export const getMe = async () => {
    try {
        const res = await fetch(`${baseURI}/getMe`, {
            method: "GET",
            credentials: "include"
        })
        if (!res.ok) {
            const err = await res.json().catch(() => { })
            throw new Error(err.message || `something went wrong ${res.status}`)
        }
        const response = await res.json()
        return response.data

    } catch (e) {
        console.log(`something went wrong ${e.message}`)

    }
}

export const logout = async () => {
    try {
        const res = await fetch(`${baseURI}/logout`, {
            credentials: "include",
            method: "GET"
        })
        if (!res.ok) {
            const err = await res.json().catch(() => { })
            throw new Error(err.message || `something went wrong ${res.status}`)
        }
        const response = await res.json()
        return response.data


    } catch (e) {
        console.log(`something went wrong ${e.message}`)

    }
}