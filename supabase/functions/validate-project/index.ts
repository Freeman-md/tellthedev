import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Static safe-list for dev/preview access
const STATIC_ALLOWED_ORIGINS = [
  "https://tellthedev.vercel.app",
  "http://127.0.0.1:5500",
];

Deno.serve(async (req: Request): Promise<Response> => {

  const origin = req.headers.get("origin") || "null";
  const isStaticAllowed = STATIC_ALLOWED_ORIGINS.includes(origin);
  const isLocalRequest = origin === "null" || origin.startsWith("http://127.");
  const isTestMode = req.headers.get("x-test-mode") === "true" && isLocalRequest;

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Vary": "Origin",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
  }

  try {
    const body = await req.json();
    const projectId = body.projectId;

    if (!projectId || typeof projectId !== "string") {
      return jsonResponse({ valid: false, error: "Missing or invalid projectId" }, 400, corsHeaders);
    }

    // UUID format check
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(projectId)) {
      return jsonResponse({ valid: false, error: "Invalid UUID format" }, 400, corsHeaders);
    }

    const { data: project, error } = await supabase
      .from("projects")
      .select("id, allowed_origins")
      .eq("id", projectId)
      .maybeSingle();

    if (!isTestMode) {
      const dynamicAllowedOrigin =
        Array.isArray(project?.allowed_origins) &&
          project.allowed_origins.includes(origin)
          ? origin
          : null;

      const finalCorsOrigin = isStaticAllowed ? origin : dynamicAllowedOrigin;

      if (!finalCorsOrigin) {
        return jsonResponse({ error: "Origin not allowed here" }, 403, corsHeaders);
      }
    }

    if (error) {
      throw new Error("Database query failed: " + error.message);
    }

    if (!project) {
      return jsonResponse({ valid: false, error: "Project not found" }, 404, corsHeaders);
    }

    return jsonResponse({ valid: true }, 200, corsHeaders);

  } catch (err: any) {
    return jsonResponse(
      {
        error: "Unhandled server error",
        details: err?.message || "Unknown failure",
      },
      500,
      corsHeaders
    );
  }
});

function jsonResponse(data: unknown, status: number = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
