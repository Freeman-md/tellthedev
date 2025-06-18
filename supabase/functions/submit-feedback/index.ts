import { createClient, PostgrestError } from "jsr:@supabase/supabase-js@2";
import "jsr:@std/dotenv/load";

type FeedbackType = "bug" | "feature" | "general";

interface FeedbackFormValues {
  projectId: string;
  type: FeedbackType;
  message: string;
  image: File | null;
}

interface ValidationResult {
  values: Partial<FeedbackFormValues>;
  errors: Record<string, string>;
}

interface JsonResponse {
  message?: string;
  imageUrl?: string | null;
  error?: string;
  details?: Record<string, string> | string;
}

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Static safe-list for dev/preview access
const STATIC_ALLOWED_ORIGINS = [
  "https://tellthedev.vercel.app",
  "http://127.0.0.1:5500",
];

Deno.serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin") || "null";
  const isLocalRequest = origin === "null" || origin.startsWith("http://127.");
  const isTestMode = req.headers.get("x-test-mode") === "true" && isLocalRequest;
  const isStaticAllowed = STATIC_ALLOWED_ORIGINS.includes(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Vary": "Origin",
  };

  console.log("[TellTheDev] METHOD:", req.method, "ORIGIN:", origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
  }

  try {
    const formData = await req.formData();
    const projectId = formData.get("projectId") as string | null;

    const { data: project } = await supabase
      .from("projects")
      .select("allowed_origins")
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
        return jsonResponse(
          { error: "Origin not allowed here" },
          403,
          corsHeaders
        );
      }
    }


    const { values, errors } = extractAndValidateForm(formData);

    if (Object.keys(errors).length > 0) {
      return jsonResponse({ error: "Validation failed", details: errors }, 400, corsHeaders);
    }

    const projectExists = !!project;
    if (!projectExists) {
      return jsonResponse({ error: "Invalid project ID" }, 404, corsHeaders);
    }

    const imageUrl = values.image
      ? await uploadImage(values.image)
      : null;

    await saveFeedback(values.projectId!, values.type!, values.message!, imageUrl);

    return jsonResponse({
      message: "Feedback submitted successfully",
      imageUrl,
    }, 200, corsHeaders);

  } catch (err: unknown) {
    return jsonResponse(
      {
        error: "Unhandled server error",
        details: err instanceof Error ? err.message : "Unknown failure",
      },
      500,
      corsHeaders
    );
  }
});

function extractAndValidateForm(formData: FormData): ValidationResult {
  const projectId = formData.get("projectId");
  const type = formData.get("type");
  const message = formData.get("message");
  const image = formData.get("image") as File | null;

  const errors: Record<string, string> = {};
  const allowedTypes: FeedbackType[] = ["bug", "feature", "general"];

  if (!projectId || typeof projectId !== "string")
    errors.projectId = "Missing or invalid projectId";

  if (typeof type !== "string" || !allowedTypes.includes(type as FeedbackType))
    errors.type = "Invalid feedback type";

  if (!message || typeof message !== "string" || message.trim().length < 5)
    errors.message = "Message is too short";

  if (image && !(image instanceof File))
    errors.image = "Invalid image file";

  return {
    values: {
      projectId: projectId as string,
      type: type as FeedbackType,
      message: message as string,
      image: image ?? null,
    },
    errors,
  };
}

async function uploadImage(image: File): Promise<string> {
  const filename = `screenshots/${Date.now()}-${image.name}`;

  const { error: uploadError } = await supabase.storage
    .from("screenshots")
    .upload(filename, image.stream(), {
      contentType: image.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error("Image upload failed: " + uploadError.message);
  }

  const { data: publicData } = supabase
    .storage
    .from("screenshots")
    .getPublicUrl(filename);

  if (!publicData?.publicUrl) {
    throw new Error("Failed to generate public image URL");
  }

  return publicData.publicUrl;
}

async function saveFeedback(
  projectId: string,
  type: FeedbackType,
  message: string,
  imageUrl: string | null
): Promise<void> {
  const { error }: { error: PostgrestError | null } = await supabase
    .from("feedback")
    .insert({
      project_id: projectId,
      type,
      message,
      screenshot_url: imageUrl,
    });

  if (error) {
    throw new Error("Database insert failed: " + error.message);
  }
}

function jsonResponse(data: JsonResponse, status: number = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
