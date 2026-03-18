import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'



export const authUser = async (req, res, next) => {
    const { AccessToken } = req.cookies

    if (!AccessToken) {
        throw new ApiError(401, "Unauthorized")
    }

    try {
        const decoded = await jwt.verify(AccessToken, process.env.ACCESS_TOKEN)
        req.user = decoded
        next()
    } catch (e) {
        throw new ApiError(500, `${e.message}`)

    }


}