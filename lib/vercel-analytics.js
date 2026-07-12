const VERCEL_ANALYTICS_ENDPOINT =
  "https://api.vercel.com/v1/query/web-analytics/visits/aggregate";

function getVercelAnalyticsConfig() {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return {
      missing: !token
        ? "Tracking is enabled, but the admin dashboard needs VERCEL_ACCESS_TOKEN to read Vercel Analytics."
        : "Enable Vercel System Environment Variables or set VERCEL_PROJECT_ID to show website visitors.",
    };
  }

  return { token, projectId, teamId };
}

function getCount(data) {
  const first = Array.isArray(data?.data) ? data.data[0] : null;

  return Number(
    first?.visits ??
      first?.pageviews ??
      first?.pageViews ??
      first?.count ??
      first?.value ??
      0,
  );
}

function getMetric(row) {
  return Number(
    row?.visits ?? row?.pageviews ?? row?.pageViews ?? row?.count ?? row?.value ?? 0,
  );
}

async function queryVercelAnalytics({ since, until, by = [], limit = 10 }) {
  const config = getVercelAnalyticsConfig();

  if (config.missing) {
    return { missing: config.missing };
  }

  const url = new URL(VERCEL_ANALYTICS_ENDPOINT);
  url.searchParams.set("projectId", config.projectId);
  url.searchParams.set("by", JSON.stringify(by));
  url.searchParams.set("since", since.toISOString());
  url.searchParams.set("until", until.toISOString());
  url.searchParams.set("limit", String(limit));

  if (config.teamId) {
    url.searchParams.set("teamId", config.teamId);
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    let detail = "";

    try {
      const body = await response.json();
      detail = body?.error?.message || body?.message || "";
    } catch {
      detail = await response.text();
    }

    throw new Error(
      `Vercel Analytics request failed (${response.status})${detail ? `: ${detail}` : ""}`,
    );
  }

  return response.json();
}

export async function getWebsiteVisitors() {
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  try {
    const [day, week, month, topPages, referrers] = await Promise.all([
      queryVercelAnalytics({ since: last24Hours, until: now }),
      queryVercelAnalytics({ since: last7Days, until: now }),
      queryVercelAnalytics({ since: last30Days, until: now }),
      queryVercelAnalytics({
        since: last7Days,
        until: now,
        by: ["requestPath"],
        limit: 5,
      }),
      queryVercelAnalytics({
        since: last7Days,
        until: now,
        by: ["referrerHostname"],
        limit: 5,
      }),
    ]);

    const missing =
      day.missing || week.missing || month.missing || topPages.missing || referrers.missing;

    if (missing) {
      return { missing };
    }

    return {
      last24Hours: getCount(day),
      last7Days: getCount(week),
      last30Days: getCount(month),
      topPages: (topPages.data ?? []).map((row) => ({
        label: row.requestPath || "/",
        value: getMetric(row),
      })),
      referrers: (referrers.data ?? [])
        .filter((row) => row.referrerHostname)
        .map((row) => ({
          label: row.referrerHostname,
          value: getMetric(row),
        })),
      updatedAt: now.toISOString(),
    };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : "Failed to load Vercel Analytics data.",
    };
  }
}
