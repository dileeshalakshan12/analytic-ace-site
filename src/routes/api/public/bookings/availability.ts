import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/bookings/availability")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const date = url.searchParams.get("date");
        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return Response.json({ error: "date=YYYY-MM-DD required" }, { status: 400 });
        }
        const start = new Date(`${date}T00:00:00.000Z`);
        const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
        if (Number.isNaN(start.getTime())) {
          return Response.json({ error: "Invalid date" }, { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("bookings")
          .select("slot_at")
          .neq("status", "cancelled")
          .gte("slot_at", start.toISOString())
          .lt("slot_at", end.toISOString());

        if (error) {
          console.error("[bookings/availability]", error);
          return Response.json({ error: "Could not load availability" }, { status: 500 });
        }
        return Response.json({ taken: (data ?? []).map((r) => r.slot_at) });
      },
    },
  },
});
