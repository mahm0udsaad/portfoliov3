"use server";

import { getTransporter } from "@/lib/mailer";

/* Minimal booking: a phone number and a chosen meeting slot. The site owner
   receives an email and follows up on WhatsApp/phone — no account, no thread. */
export async function bookCall(formData: FormData) {
  const phone = (formData.get("phone") as string)?.trim();
  const meetingAt = (formData.get("meetingAt") as string)?.trim();
  const locale = (formData.get("locale") as string) || "en";

  if (!phone || phone.replace(/\D/g, "").length < 8) {
    return { success: false, message: "Invalid phone number" };
  }
  if (!meetingAt) {
    return { success: false, message: "Missing meeting time" };
  }

  const transporter = getTransporter();

  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `📞 New call booking — ${meetingAt}`,
      text: [
        `Phone: ${phone}`,
        `Requested meeting: ${meetingAt}`,
        `Language: ${locale}`,
        `WhatsApp: https://wa.me/${phone.replace(/\D/g, "")}`,
      ].join("\n"),
    });

    return { success: true, message: "Booked" };
  } catch (error) {
    console.error("Failed to send booking email:", error);
    return { success: false, message: "Failed to book" };
  }
}
