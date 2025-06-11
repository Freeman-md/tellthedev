import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200 });
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const projectId = body.projectId;

    if (!projectId || typeof projectId !== "string") {
      return jsonResponse({ valid: false, error: "Missing or invalid projectId" }, 400);
    }

    // UUID format check
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(projectId)) {
      return jsonResponse({ valid: false, error: "Invalid UUID format" }, 400);
    }

    const { data, error } = await supabase
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .maybeSingle();

    if (error) {
      throw new Error("Database query failed: " + error.message);
    }

    if (!data) {
      return jsonResponse({ valid: false, error: "Project not found" }, 404);
    }

    return jsonResponse({ valid: true });
  } catch (err: any) {
    return jsonResponse(
      {
        error: "Unhandled server error",
        details: err?.message || "Unknown failure",
      },
      500
    );
  }
});

function jsonResponse(data: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
