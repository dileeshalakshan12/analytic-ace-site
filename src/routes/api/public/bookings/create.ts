import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  topic: z.string().trim().max(500).optional().or(z.literal("")),
  slot_at: z.string().datetime(),
  timezone: z.string().trim().min(1).max(64),
});

export const Route = createFileRoute("/api/public/bookings/create")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = Schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
        }
        const data = parsed.data;
        const slot = new Date(data.slot_at);
        if (Number.isNaN(slot.getTime()) || slot.getTime() < Date.now() + 5 * 60 * 1000) {
          return Response.json({ error: "Slot must be in the future" }, { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: inserted, error } = await supabaseAdmin
          .from("bookings")
          .insert({
            name: data.name,
            email: data.email,
            company: data.company || null,
            topic: data.topic || null,
            slot_at: slot.toISOString(),
            timezone: data.timezone,
            status: "pending",
          })
          .select("id, slot_at")
          .single();

        if (error) {
          if (error.code === "23505") {
            return Response.json({ error: "That time slot was just taken. Please pick another." }, { status: 409 });
          }
          console.error("[bookings/create]", error);
          return Response.json({ error: "Could not create booking" }, { status: 500 });
        }

        // Best-effort confirmation email (silently no-op if email infra isn't ready yet)
        try {
          const SUPABASE_URL = process.env.SUPABASE_URL;
          const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (SUPABASE_URL && SERVICE_KEY) {
            await fetch(`${new URL(request.url).origin}/lovable/email/transactional/send`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${SERVICE_KEY}`,
              },
              body: JSON.stringify({
                templateName: "booking-confirmation",
                recipientEmail: data.email,
                idempotencyKey: `booking-${inserted.id}`,
                templateData: {
                  name: data.name,
                  slotISO: slot.toISOString(),
                  timezone: data.timezone,
                  topic: data.topic || "",
                },
              }),
            }).catch(() => {});
          }
        } catch {
          // ignore — booking is still saved
        }

        return Response.json({ ok: true, id: inserted.id });
      },
    },
  },
});
