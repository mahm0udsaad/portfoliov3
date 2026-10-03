import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { HOME_CONTENT, PROJECT_CATEGORIES } from "@/lib/home-content";
import { applyProjectOrder, getAllProjectOrderRows } from "@/lib/project-order";
import AdminSignOut from "@/components/admin-sign-out";
import ProjectManager from "@/components/admin/project-manager";

export const metadata = {
  title: "Admin — Projects",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { rows, tableMissing, error, hasCategory } = await getAllProjectOrderRows();
  const projects = applyProjectOrder(HOME_CONTENT.en.projects, rows, { includeHidden: true }).map(
    ({ id, title, image, published, category }) => ({ id, title, image, published, category }),
  );
  const categories = PROJECT_CATEGORIES.map((key) => ({ key, label: HOME_CONTENT.en.work.tabs[key] }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-5 md:px-14">
          <p className="font-serif text-[22px] tracking-tight">
            Mahmoud Saad<span className="text-primary">.</span>{" "}
            <span className="font-sans text-base text-muted-foreground">/ Projects</span>
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Bookings
            </Link>
            <Link
              href="/admin/chat"
              className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Voice notes
            </Link>
            <AdminSignOut />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 md:px-14">
        <div className="mb-8">
          <h1 className="font-serif text-[32px] font-semibold leading-tight tracking-tight md:text-[38px]">
            Project order
          </h1>
          <p className="mt-2 max-w-[560px] text-sm text-muted-foreground">
            Drag the grip or use the arrows to reorder, pick the tab each project appears under, and use
            the eye to hide one. Changes save automatically and go live on the English and Arabic
            homepages. Order applies inside each tab.
          </p>
        </div>

        {tableMissing ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            The <code className="font-mono">project_order</code> table hasn&apos;t been created yet. Run{" "}
            <code className="font-mono">supabase/migrations/0004_project_order.sql</code> in the Supabase SQL
            editor, then refresh this page.
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
            Failed to load the project order: {error}
          </div>
        ) : null}

        {!tableMissing && !error && !hasCategory ? (
          <div className="mb-6 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            To move projects between tabs, run{" "}
            <code className="font-mono">supabase/migrations/0005_project_category.sql</code> in the Supabase SQL
            editor. Ordering and hiding already work.
          </div>
        ) : null}

        {!tableMissing && !error ? (
          <ProjectManager projects={projects} categories={hasCategory ? categories : null} />
        ) : null}
      </main>
    </div>
  );
}
