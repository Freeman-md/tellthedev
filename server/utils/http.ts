// server/utils/http.ts
import type { H3Event } from 'h3'

export const setCorsHeaders = (event: H3Event, origin: string) => {
    event.node.res.setHeader('Access-Control-Allow-Origin', origin);
    event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    event.node.res.setHeader('Access-Control-Allow-Credentials', 'true');

}

export function validateOrigin(origin: string, project: { origins: string[] }) {
    if (!Array.isArray(project.origins) || !project.origins.includes(origin)) {
        throw createError({
            statusCode: 403,
            statusMessage: `Origin not allowed: ${origin}`,
        })
    }
}
