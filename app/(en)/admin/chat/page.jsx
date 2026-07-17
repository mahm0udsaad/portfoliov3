import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAllChatMessages } from "@/lib/chat-messages";
import AdminSignOut from "@/components/admin-sign-out";
import ChatManager from "@/components/admin/chat-manager";

export const metadata = {
  title: "Admin — Chat content",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { rows, tableMissing, error } = await getAllChatMessages();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-14 py-5">
          <p className="font-serif text-[22px] tracking-tight">
            Mahmoud Saad<span className="text-primary">.</span>{" "}
            <span className="text-muted-foreground text-base font-sans">
              / Chat content
            </span>
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Bookings
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <AdminSignOut />
          </div>
        </div>
      </header>

      <main className="px-6 md:px-14 py-10 max-w-[1180px] mx-auto">
        <div className="mb-8">
          <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-3">
            Live client feedback
          </div>
          <h1 className="font-serif font-normal text-[32px] md:text-[38px] leading-tight tracking-tight">
            Chat messages
          </h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-[560px]">
            Reorder, edit, hide, delete, or upload new voice notes and
            screenshots. Changes go live on the homepage chat immediately.
          </p>
        </div>

        {tableMissing && (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            The <code className="font-mono">chat_messages</code> table hasn&apos;t
            been created yet. Run the migration in{" "}
            <code className="font-mono">
              supabase/migrations/0002_chat_messages.sql
            </code>{" "}
            via the Supabase SQL editor, then refresh this page.
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
            Failed to load chat messages: {error}
          </div>
        )}

        {!tableMissing && !error && <ChatManager messages={rows} />}
      </main>
    </div>
  );
}
