import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

let transporter = null
const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS
if (user && pass && !user.includes('your-email')) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: { user, pass }
  })
}

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter) return false
  const from = process.env.EMAIL_FROM || user
  await transporter.sendMail({ from, to, subject, text, html })
  return true
}

export default sendEmail
export const emailTemplate = (title, body) => `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"/></head><body style="font-family:Segoe UI,Roboto,Arial,sans-serif;background:#f3f4f6;margin:0;padding:24px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center"><div style="max-width:600px;background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.08);overflow:hidden"><div style="background:linear-gradient(90deg,#6366f1,#9333ea);color:#fff;padding:20px 24px;font-size:18px;font-weight:600">${title}</div><div style="padding:24px;color:#111827;font-size:16px;line-height:1.6">${body}</div><div style="padding:16px 24px;color:#6b7280;font-size:12px;border-top:1px solid #e5e7eb">This is an automated notification from CRM System.</div></div></td></tr></table></body></html>`