import express from 'express'
import { authController } from '../controllers/auth.controller.js'
import { validateLogin, validateRegister } from '../validation/auth.validation.js'
import { authUser } from '../middleware/verify.user.middleware.js'

const AuthRoutes = express.Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
AuthRoutes.post("/register", validateRegister, authController.registerUser)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email
 * @access Public
 */

AuthRoutes.get("/verify-email", authController.verify_email)

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 */

AuthRoutes.post("/login", validateLogin, authController.login)

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's info
 * @access Private
 */

AuthRoutes.get("/getMe", authUser, authController.getMe)

/**
 * @route GET /api/auth/logout
 * @desc Logout user and clear tokens
 * @access Private
 */
AuthRoutes.get("/logout", authUser, authController.logout)

// AuthRoutes.get("/deleteAccount",)

/**
 * @route POST /api/auth/resend-email
 * @desc Resend email verification link
 * @access Public
 */
AuthRoutes.post("/resend-email", authController.resend_email)

AuthRoutes.post("/updatePassword", authUser, authController.updatePassword)
export default AuthRoutes