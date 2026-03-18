import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,


    },
    verified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        select: false
    },
    emailToken: {
        type: String,
        select: false
    }
}, { timestamps: true })

userSchema.pre('save', async function () {
    if (!this.isModified("password")) { return }

    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        username: this.username
    }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })

}
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
}

userSchema.methods.generateEmailToken = async function () {
    return jwt.sign({
        _id: this._id, email: this.email
    },
        process.env.EMAIL_TOKEN,
        { expiresIn: process.env.EMAIL_TOKEN_EXPIRE })
}

const userModel = mongoose.model("users", userSchema)

export default userModel