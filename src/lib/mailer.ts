import nodemailer from "nodemailer";
import { Resend } from "resend";

let resendClient: Resend | null | undefined;

function getResendClient() {
  if (resendClient !== undefined) {
    return resendClient;
  }

  resendClient = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  return resendClient;
}

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResendClient();

  if (resend && process.env.RESEND_FROM) {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to,
      subject,
      html,
    });
    return;
  }

  const transporter = getTransporter();

  if (!transporter || !process.env.SMTP_FROM) {
    console.warn(`Email skipped: ${subject} -> ${to}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
}
