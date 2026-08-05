import nodemailer from "nodemailer";

import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
const emailPort = process.env.EMAIL_PORT
  ? Number(process.env.EMAIL_PORT)
  : 587;
const emailSecure = process.env.EMAIL_SECURE
  ? process.env.EMAIL_SECURE === "true"
  : emailPort === 465;

const transporter = nodemailer.createTransport(
  {
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    requireTLS: !emailSecure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
    family: 4,
    connectionTimeout: 20000,
    greetingTimeout: 20000,
  } as any
);

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Email credentials are not configured. Set EMAIL_USER and EMAIL_PASS."
    );
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  } catch (error: any) {
    console.error("Failed to send email:", error);

    const code = error?.code || "UNKNOWN";
    const message = error?.message || "No error message returned.";

    if (code === "EAUTH") {
      throw new Error(
        "Email authentication failed. Check EMAIL_USER and EMAIL_PASS, or use a Gmail app password."
      );
    }

    if (code === "ETIMEDOUT") {
      throw new Error(
        `Unable to send reset email (${code}). Connection timed out to ${emailHost}:${emailPort}. Check your SMTP host, port, and network/firewall rules.`
      );
    }

    throw new Error(
      `Unable to send reset email (${code}). ${message}`
    );
  }
};