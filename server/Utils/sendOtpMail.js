import { Resend } from "resend";
import dotenv from "dotenv/config";

const sendOtpMail = async (mail, otp) => {
  const resend = new Resend(process.env.RESENT_API_KEY);

  const from = "No Reply <no-reply@fincode.in>";
  const to = mail;
  const subject = "Login Code Inside - Valid for 10 Minutes";
  const body = `<body><p><strong>🔐 Password Reset ${otp}</strong></p><p>Hello Kirtan,</p><p>Use the following One-Time Password (OTP) to reset your password:</p><p><strong><span>927416</span></strong></p><p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p><p>If you didn't request a password reset, you can safely ignore this email.</p><br /><p>— The Todo Clone 2 Team</p></body>`;
};

export default sendOtpMail;
