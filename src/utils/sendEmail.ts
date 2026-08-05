import nodemailer from "nodemailer";

import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
const transporter = nodemailer.createTransport(
  {
    service: "gmail",
  //     host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  // family: 4,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  } as any
);

// verify the connection configuration
transporter.verify(
  (error, success) => {
    if (error) {
      console.log(
        "SMTP ERROR:",
        error
      );
    } else {
      console.log(
        "SMTP READY"
      );
    }
  }
);
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

    if (error?.code === "EAUTH") {
      throw new Error(
        "Email authentication failed. Check EMAIL_USER and EMAIL_PASS, or use a Gmail app password."
      );
    }

    throw new Error(
      "Unable to send reset email. Please check your email service configuration."
    );
  }
};