"use server";

import nodemailer from "nodemailer";
export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP server
    port: parseInt(process.env.SMTP_PORT || "587"),
    auth: {
      user: "saad123mn123@gmail.com",
      pass: "lblslwqqfvnezark",
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "101mahm0udsaad@gmail.com",
      subject: `New message from Website`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
