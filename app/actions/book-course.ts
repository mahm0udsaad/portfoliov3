"use server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getTransporter } from "@/lib/mailer";

async function notifyAdmin(booking: {
  name: string;
  phone: string;
  willingToPay: boolean;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New course booking: ${booking.name}`,
    text: `New reservation for the AI Video Editing course.

Name: ${booking.name}
Phone / WhatsApp: ${booking.phone}
Willing to pay: ${booking.willingToPay ? "Yes" : "No"}

Message on WhatsApp: https://wa.me/${booking.phone.replace(/[^0-9]/g, "")}
View all bookings: https://mahmoudsaad.site/admin
`,
  });
}

export type BookCourseResult = {
  success: boolean;
  message: string;
};

// At least 7 digits once non-digits are stripped — enough to reject junk while
// staying permissive about country codes and formatting.
function isValidPhone(digits: string): boolean {
  return digits.length >= 7 && digits.length <= 15;
}

export async function bookCourse(
  formData: FormData,
): Promise<BookCourseResult> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const phoneRaw = (formData.get("phone") as string | null)?.trim() ?? "";
  const willingToPay = formData.get("willing_to_pay") === "on";

  // Validation
  if (name.length < 2) {
    return { success: false, message: "Please enter your name." };
  }
  const phoneDigits = phoneRaw.replace(/[^0-9]/g, "");
  if (!isValidPhone(phoneDigits)) {
    return {
      success: false,
      message: "Please enter a valid phone / WhatsApp number.",
    };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("course_bookings").insert({
      name,
      phone: phoneRaw,
      willing_to_pay: willingToPay,
      course: "AI Video Editing",
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

    notifyAdmin({ name, phone: phoneRaw, willingToPay }).catch((err) =>
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
