export const dynamic = "force-dynamic";

export const GET = () =>
  new Response("healthy\n", {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
