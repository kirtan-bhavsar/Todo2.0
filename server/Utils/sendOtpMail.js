import { Resend } from "resend";
import dotenv from "dotenv/config";

const sendOtpMail = async (res, mail, otp) => {
  const resend = new Resend(process.env.RESENT_API_KEY);

  const from = "Todo Team <onboarding@resend.dev>";
  const to = mail;
  const subject = "Login Code Inside - Valid for 10 Minutes";
  const body = `<body><p><strong>🔐 Password Reset OTP</strong></p><p>Hello Kirtan,</p><p>Use the following One-Time Password (OTP) to reset your password:</p><p><strong><span>927416</span></strong></p><p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p><p>If you didn't request a password reset, you can safely ignore this email.</p><br /><p>— The Todo Clone 2 Team</p></body>`;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html: body,
  });

  if (error) {
    console.log(error);
    return res.status(400).json({ error });
  }

  console.log(data);
  return res.status(200).json(data);
};

export default sendOtpMail;
