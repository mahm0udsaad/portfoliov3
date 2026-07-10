"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BellOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminNotifications() {
  const router = useRouter();
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    setPermission(Notification.permission);
    if (Notification.permission === "default") {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("admin-course-bookings")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "course_bookings" },
        (payload) => {
          const booking = payload.new;

          if (
            typeof window !== "undefined" &&
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            const notification = new Notification("New course reservation", {
              body: `${booking.name} just reserved a seat${
                booking.willing_to_pay ? " — willing to pay 999 EGP" : ""
              }`,
              icon: "/logo.png",
              tag: booking.id,
            });
            notification.onclick = () => {
              window.focus();
              notification.close();
            };
          }

          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  async function enableNotifications() {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  }

  if (permission === "granted") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Bell className="w-3.5 h-3.5 text-primary" />
        Notifications on
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={enableNotifications}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      <BellOff className="w-3.5 h-3.5" />
      {permission === "denied" ? "Notifications blocked" : "Enable notifications"}
    </button>
  );
}
