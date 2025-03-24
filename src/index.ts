import { serve } from "bun";

serve({
  port: 3000,
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname === "/api/generate" && req.method === "POST") {
      try {
        const { chat } = await req.json();

        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistral",
            prompt: chat,
            stream: false,
          }),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("Server error:", err);
        return new Response(
          JSON.stringify({ message: "Internal Error" }),
          { status: 500 }
        );
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});
