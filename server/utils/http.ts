// server/utils/http.ts
import type { H3Event } from 'h3'

export const setCorsHeaders = (event: H3Event, origin: string) => {
    event.node.res.setHeader('Access-Control-Allow-Origin', origin);
    event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    event.node.res.setHeader('Access-Control-Allow-Credentials', 'true');

}

export function validateOrigin(origin: string, project: { origins: string[] }) {
  const allowedPreviewOrigin = 'https://tellthedev.vercel.app'

  const isAllowedOrigin =
    Array.isArray(project.origins) && project.origins.includes(origin)

  const isPreview = origin === allowedPreviewOrigin

  if (!isAllowedOrigin && !isPreview) {
    throw createError({
      statusCode: 403,
      statusMessage: `Origin not allowed: ${origin}`,
    })
  }
}
