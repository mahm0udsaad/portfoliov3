"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BellOff } from "lucide-react";
import { pollBookings } from "@/app/actions/poll-bookings";

const POLL_INTERVAL_MS = 10000;

export default function AdminNotifications({ initialCount = 0 }) {
  const router = useRouter();
  const [permission, setPermission] = useState("default");
  // Baseline count so existing bookings on load never trigger a notification.
  const lastCount = useRef(initialCount);

  // Ask for notification permission on mount.
  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    setPermission(Notification.permission);
    if (Notification.permission === "default") {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  // Poll for new bookings.
  useEffect(() => {
    let cancelled = false;

    async function check() {
      const result = await pollBookings();
      if (cancelled || !result.authorized) return;

      const prev = lastCount.current;
      const delta = result.count - prev;

      if (delta > 0) {
        lastCount.current = result.count;

        if (
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          const title =
            delta === 1 ? "New course reservation" : `${delta} new reservations`;
          const body =
            delta === 1 && result.latest
              ? `${result.latest.name} just reserved a seat${
                  result.latest.willing_to_pay ? " — willing to pay 999 EGP" : ""
                }`
              : "Open the admin dashboard to see the details.";

          const notification = new Notification(title, {
            body,
            icon: "/logo.png",
            tag: "course-booking",
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        }

        // Refresh the server component so the table shows the new rows.
        router.refresh();
      } else if (delta < 0) {
        // Count dropped (deletion) — keep baseline in sync.
        lastCount.current = result.count;
      }
    }

    const interval = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
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
