"use server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getTransporter } from "@/lib/mailer";

async function notifyAdmin(booking: {
  name: string;
  email: string;
  phone: string | null;
  willingToPay: boolean;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New course booking: ${booking.name}`,
    text: `New reservation for AI & Video Editing with AI.

Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone ?? "—"}
Willing to pay 1000 EGP: ${booking.willingToPay ? "Yes" : "No"}

View all bookings: https://mahmoudsaad.site/admin
`,
  });
}

export type BookCourseResult = {
  success: boolean;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function bookCourse(
  formData: FormData,
): Promise<BookCourseResult> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phoneRaw = (formData.get("phone") as string | null)?.trim() ?? "";
  const willingToPay = formData.get("willing_to_pay") === "on";

  // Validation
  if (name.length < 2) {
    return { success: false, message: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const phone = phoneRaw.length > 0 ? phoneRaw : null;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("course_bookings").insert({
      name,
      email,
      phone,
      willing_to_pay: willingToPay,
      course: "AI & Video Editing with AI",
      source: "portfolio-book-page",
    });

    if (error) {
      console.error("Failed to save booking:", error);
      // Surface the "table missing" case clearly during setup.
      if (error.code === "PGRST205") {
        return {
          success: false,
          message:
            "Booking storage isn't set up yet. Please run the course_bookings migration.",
        };
      }
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    notifyAdmin({ name, email, phone, willingToPay }).catch((err) =>
      console.error("Failed to send admin notification email:", err),
    );

    return {
      success: true,
      message: "You're booked! We'll reach out with the next steps soon.",
    };
  } catch (err) {
    console.error("Booking error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
