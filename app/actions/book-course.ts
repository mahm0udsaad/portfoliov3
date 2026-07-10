"use server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

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
