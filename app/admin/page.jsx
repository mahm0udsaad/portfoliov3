import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import AdminSignOut from "@/components/admin-sign-out";

export const metadata = {
  title: "Admin — Bookings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  let bookings = [];
  let tableMissing = false;
  let fetchError = null;

  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("course_bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "PGRST205") {
        tableMissing = true;
      } else {
        fetchError = error.message;
      }
    } else {
      bookings = data ?? [];
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Unknown error";
  }

  const willingCount = bookings.filter((b) => b.willing_to_pay).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-14 py-5">
          <p className="font-serif text-[22px] tracking-tight">
            Mahmoud Saad<span className="text-primary">.</span>{" "}
            <span className="text-muted-foreground text-base font-sans">
              / Admin
            </span>
          </p>
          <div className="flex items-center gap-6">
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
            Course bookings
          </div>
          <h1 className="font-serif font-normal text-[32px] md:text-[38px] leading-tight tracking-tight">
            Reservation requests
          </h1>
        </div>

        {tableMissing && (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            The <code className="font-mono">course_bookings</code> table
            hasn&apos;t been created yet. Run the migration in{" "}
            <code className="font-mono">
              supabase/migrations/0001_course_bookings.sql
            </code>{" "}
            via the Supabase SQL editor, then refresh this page.
          </div>
        )}

        {fetchError && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
            Failed to load bookings: {fetchError}
          </div>
        )}

        {!tableMissing && !fetchError && (
          <>
            <div className="flex flex-wrap gap-4 mb-8">
              <StatCard label="Total requests" value={bookings.length} />
              <StatCard label="Willing to pay" value={willingCount} />
            </div>

            {bookings.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
                No reservations yet.
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-muted-foreground">
                      <Th>Date</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Willing to pay</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr
                        key={b.id}
                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <Td className="whitespace-nowrap text-muted-foreground">
                          {new Date(b.created_at).toLocaleString("en-GB", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </Td>
                        <Td className="font-medium">{b.name}</Td>
                        <Td>
                          <a
                            href={`mailto:${b.email}`}
                            className="hover:text-primary transition-colors"
                          >
                            {b.email}
                          </a>
                        </Td>
                        <Td>
                          {b.phone ? (
                            <a
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              className="hover:text-primary transition-colors"
                            >
                              {b.phone}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </Td>
                        <Td>
                          {b.willing_to_pay ? (
                            <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs font-semibold">
                              Yes
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-4 min-w-[160px]">
      <div className="text-[12px] font-semibold tracking-wider uppercase text-muted-foreground mb-1">
        {label}
      </div>
      <div className="font-serif text-3xl">{value}</div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`px-5 py-4 ${className}`}>{children}</td>;
}
