import { corsHeaders } from "@supabase/supabase-js/cors";
import { z } from "npm:zod@3.23.8";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const RECIPIENT = "andrewnicolesanosa@gmail.com";
const FROM_ADDRESS = "Andrew Sañosa Portfolio <onboarding@resend.dev>";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "music-video": "Music Video",
  commercial: "Commercial / Ad",
  "short-film": "Short Film",
  youtube: "YouTube / Creator",
  other: "Other",
};

const BodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  projectType: z.enum(["music-video", "commercial", "short-film", "youtube", "other"]),
  message: z.string().trim().min(10).max(2000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(d: z.infer<typeof BodySchema>) {
  const messageHtml = escapeHtml(d.message).replace(/\n/g, "<br/>");
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#0e1517;font-family:Inter,Arial,sans-serif;color:#e8e2d4">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0e1517;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#141d20;border:1px solid #233037;border-radius:4px;overflow:hidden">
        <tr><td style="padding:24px 28px;border-bottom:1px solid #233037">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.25em;color:#e87b3a;text-transform:uppercase">⏵ New Inquiry</div>
          <h1 style="margin:8px 0 0;font-family:Oswald,Impact,sans-serif;font-size:24px;letter-spacing:.04em;color:#e8e2d4">${escapeHtml(d.name)}</h1>
          <div style="margin-top:4px;font-size:13px;color:#9aa1a3">${escapeHtml(PROJECT_TYPE_LABELS[d.projectType])} · ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</div>
        </td></tr>
        <tr><td style="padding:24px 28px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;color:#9aa1a3;text-transform:uppercase;margin-bottom:6px">Message</div>
          <div style="font-size:15px;line-height:1.6;color:#e8e2d4;white-space:pre-wrap">${messageHtml}</div>
        </td></tr>
        <tr><td style="padding:20px 28px;border-top:1px solid #233037;background:#0f181b">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#9aa1a3;text-transform:uppercase;letter-spacing:.18em">Reply to</td>
              <td align="right"><a href="mailto:${encodeURIComponent(d.email)}" style="color:#5fc7d6;text-decoration:none;font-size:14px">${escapeHtml(d.email)}</a></td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:14px 28px;background:#0e1517;font-size:11px;color:#6c7375;font-family:'JetBrains Mono',monospace;letter-spacing:.15em;text-transform:uppercase">
          Sent from andrewsanosa.portfolio
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildText(d: z.infer<typeof BodySchema>) {
  return [
    `New ${PROJECT_TYPE_LABELS[d.projectType]} inquiry`,
    ``,
    `From: ${d.name} <${d.email}>`,
    `Sent: ${new Date().toISOString()}`,
    ``,
    `--- Message ---`,
    d.message,
    ``,
    `--- Reply to ${d.email} ---`,
  ].join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = parsed.data;
    const subject = `New ${PROJECT_TYPE_LABELS[data.projectType]} inquiry — ${data.name}`;

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [RECIPIENT],
        reply_to: data.email,
        subject,
        html: buildHtml(data),
        text: buildText(data),
      }),
    });

    const result = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error("Resend gateway error", resp.status, result);
      return new Response(
        JSON.stringify({ error: "Email send failed", status: resp.status, details: result }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ ok: true, id: result?.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("send-contact-email error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
