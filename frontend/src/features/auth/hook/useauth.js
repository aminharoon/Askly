import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../services/auth.api.js";
import { setUser, setError, setLoading } from "../auth.slice.js"



export const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async ({ username, email, password }) => {
        try {
            dispatch(setLoading(true))

            const data = await register(({ username, email, password }))


        } catch (e) {
            dispatch(setError(`Registration failed ${e.message}`))
        }
        finally {
            dispatch(setLoading(false))
        }
    }
    const handleLogin = async ({ email, password }) => {
        try {
            dispatch(setLoading(true))

            const data = await login(({ email, password }))

            dispatch(setUser(data))

        } catch (e) {
            dispatch(setError(`login failed ${e.message}`))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true))
            const data = await getMe()

            dispatch(setUser(data))

        } catch (e) {
            dispatch(setError(`get me failed ${e.message}`))

        }
        finally {
            dispatch(setLoading(false))
        }
    }
    const handleLogout = async () => {
        try {
            dispatch(setLoading(true))
            const data = await logout()
            dispatch(setUser(data))

        } catch (e) {
            dispatch(setError(`failed logout ${e.message}`))

        }
        finally {
            dispatch(setLoading(false))
        }
    }


    return {
        handleRegister, handleLogin, handleGetMe, handleLogout
    }

}