// server/utils/http.ts
import type { H3Event } from 'h3'

export const setCorsHeaders = (event: H3Event, origin: string) => {
  setHeader(event, 'Access-Control-Allow-Origin', origin)
  setHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'content-type, x-test-mode')
  setHeader(event, 'Vary', 'Origin')
}

export function validateOrigin(origin: string, project: { origins: string[] }) {
  if (!Array.isArray(project.origins) || !project.origins.includes(origin)) {
    throw createError({
      statusCode: 403,
      statusMessage: `Origin not allowed: ${origin}`,
    })
  }
}
