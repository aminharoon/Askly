import nodemailer from 'nodemailer'

import { emailTemplates } from '../templates/emailTemplates.js'



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }

})


transporter.verify((error, success) => {
    if (error) {
        console.log("❌ SMTP Error:", error.message)
    } else {
        console.log("✅ SMTP Ready:", success)
    }
})


// Modern Email Templates
export { emailTemplates }

export async function sendEmail({ to, subject, html, text }) {
    const mailOPtions = {
        from: process.env.GOOGLE_USER,
        to, subject, html, text
    }
    const details = await transporter.sendMail(mailOPtions)
    return `Email sent to ${to} with subject "${subject}". `

}