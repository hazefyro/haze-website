import type { APIRoute } from "astro";

export const GET = (async () => {
    try {
        const res = await fetch("https://hazefyro.substack.com/feed");

        if (!res.ok) {
            return new Response("Failed to fetch", { status: 500 });
        }

        const xml = await res.text();

        return new Response(xml, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch {
        return new Response("Error", { status: 500 });
    }
}) satisfies APIRoute;
