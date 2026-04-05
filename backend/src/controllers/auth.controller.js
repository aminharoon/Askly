import userModel from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import { sendEmail } from '../services/mail.service.js'
import { emailTemplates } from '../templates/emailTemplates.js'
import jwt from 'jsonwebtoken'

const generateAccessRefreshToken = async (user) => {
    try {


        const AccessToken = await user.generateAccessToken()
        const RefreshToken = await user.generateRefreshToken()

        user.refreshToken = RefreshToken

        user.save({ validateBeforeSave: false })

        return { AccessToken, RefreshToken }


    } catch (e) {
        console.log("something went wrong while generating the Access and refresh token ", e.message)

    }
}

const generateEmailToken = async (user) => {
    try {
        const Email_token = await user.generateEmailToken()
        user.emailToken = Email_token
        user.save({ validateBeforeSave: false })
        return Email_token

    } catch (e) {
        throw new ApiError(401, `something went wrong while generating the email token  ${e.message}`)
    }
}



const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const isUser = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    if (isUser) {
        throw new ApiError(409, "user is already register with this email or username")

    }
    const user = await userModel.create({
        username,
        email,
        password
    })
    await generateEmailToken(user)
    const html = `<h1>EMAIL VERIFICATION LINK ! 🚀</h1>
    <p>Dear ${user.username},</p>
    <p>Your Email verification link is generated successfully .Please check your inbox and verify your email . </p>
   <a href="http://localhost:3000/api/auth/verify-email?token=${user.emailToken}"> Verify Email </a>
    `
    await sendEmail({
        to: email,
        subject: "EMAIL VERIFICATION LINK ! 🚀",
        html: html
    })
    return res.status(201).json(new ApiResponse(201, "userCreated successfully", user))


}


const verify_email = async (req, res) => {
    const { token } = req.query

    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN)

    const user = await userModel.findOne({ email: decoded.email })
    if (!user) {
        throw new ApiError(404, "user not found")
    }

    if (user.verified) {
        const html = `<h1>EMAIL IS ALREADY VERIFIED! </h1>
        <p>Your Account is already verified   </p>
        <a href="http://localhost:3000/api/auth/login"> login </a>
        `
        res.send(html)
    }
    else {

        user.verified = true
        await user.save({ validateBeforeSave: false })

        const html = `<h1>EMAIL VERIFIED SUCCESSFULLY ! </h1>
        <p>Your Email is successfully verified .You can now login in to your account . </p>
        <a href="http://localhost:3000/api/auth/login"> login </a>
        `
        res.send(html)
    }
}

const resend_email = async (req, res) => {
    const COOLDOWN_SECONDS = 60
    const { email } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        throw new ApiError(404, "user not found !")
    }
    if (user.verified) {
        res.status(200)
            .json(new ApiResponse(200, "email is already verified "))
    }

    await generateEmailToken(user)
    const html = `<h1>EMAIL VERIFICATION LINK RESEND! </h1>
    <p>Dear ${user.username},</p>
    <p>Your Email verification link is resend successfully .Please check your inbox and verify your email . </p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${user.emailToken}"> Verify Email </a>
    `

    await sendEmail({
        to: email,
        subject: "EMAIL VERIFICATION LINK RESEND! 🚀",
        html: html
    })
    return res.status(201).json(new ApiResponse(201, "email sent successfully", user))

}

const login = async (req, res) => {
    const { email, password } = req.body
    const isUser = await userModel.findOne({ email })

    if (!isUser) {
        throw new ApiError(404, "user not found ")
    }
    const isPasswordValid = await isUser.comparePassword(password)
    if (!isPasswordValid) {
        throw new ApiError(400, "invalid credentials")

    }
    if (!isUser.verified) {
        throw new ApiError(400, "please verify your email before login")
    }
    else {
        const user = await userModel.findOne({ email }).select("-password -refreshToken -emailToken")
        const { AccessToken, RefreshToken } = await generateAccessRefreshToken(isUser)
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .cookie("refreshToken", RefreshToken, options)
            .cookie("AccessToken", AccessToken, options)
            .json(new ApiResponse(200, "login successful", user))
    }

}

const getMe = async (req, res) => {
    const userID = req.user._id

    const user = await userModel.findById(userID).select("-password -refreshToken -emailToken")

    if (!user) {
        throw new ApiError(404, "user not found ")

    }
    res.status(200).json(new ApiResponse(200, "user find successfully ", user))



}

const logout = async (req, res) => {
    const token = req.cookies.AccessToken
    const user = await userModel.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 }
    })
    if (!user) {
        throw new ApiError("User is Already Logout ")
    }

    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .clearCookie("AccessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, `${user.username} logout successfully `, {}))


}

// Request → Verify user → Check old password → Set new password → Save → Done
const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await userModel.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "user not found ")
    }
    if (oldPassword === newPassword) {
        throw new ApiError(400, "new password cannot be same as old password ")
    }
    const isPasswordValid = await user.comparePassword(oldPassword)

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid password ")
    }

    user.password = newPassword
    user.save()

    const html = `<h1>PASSWORD UPDATED! </h1>
    <p>Dear ${user.username},</p>
    <p>Your password has been updated successfully .If you did not perform this action please contact support immediately . </p>
    <a href="http://localhost:3000/api/auth/login"> login </a>  
    `
    await sendEmail({
        to: user.email,
        subject: "PASSWORD UPDATED! 🚀",
        html: html
    })


    res.status(200).json(new ApiResponse(200, "Password updated successfully"))




}

export const authController = {
    registerUser,
    verify_email,
    resend_email,
    login,
    getMe,
    logout,
    updatePassword
}
