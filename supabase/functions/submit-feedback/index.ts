import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2";

console.log("Hello from Functions!")

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200 });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const formData = await req.formData();

    const projectId = formData.get("projectId");
    const type = formData.get("type");
    const message = formData.get("message");
    const image = formData.get("image") as File;

    const errors: Record<string, string> = {};

    if (!projectId || typeof projectId !== "string")
      errors.projectId = "Missing or invalid projectId";

    if (["bug", "feature", "general"].indexOf(type as string) === -1)
      errors.type = "Invalid feedback type";

    if (!message || typeof message !== "string" || message.trim().length < 5)
      errors.message = "Message is too short";

    if (!image || !(image instanceof File))
      errors.image = "Missing or invalid image";

    if (Object.keys(errors).length > 0) {
      return jsonResponse({ error: "Validation failed", details: errors }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    const filename = `screenshots/${crypto.randomUUID()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("screenshots")
      .upload(filename, image.stream(), {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError) throw new Error("Image upload failed: " + uploadError.message);

    const { data: publicData, error: urlError } = supabase
      .storage
      .from("screenshots")
      .getPublicUrl(filename);

    if (urlError || !publicData?.publicUrl)
      throw new Error("Failed to generate public image URL");

    const { error: dbError } = await supabase.from("feedback").insert({
      project_id: projectId,
      type,
      message,
      screenshot_url: publicData.publicUrl,
    });

    if (dbError) throw new Error("Database insert failed: " + dbError.message);

    return jsonResponse({
      message: "Feedback submitted successfully",
      imageUrl: publicData.publicUrl,
    });

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

function jsonResponse(data: any, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/submit-feedback' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
