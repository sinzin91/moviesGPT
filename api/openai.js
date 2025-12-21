import { Readable } from "node:stream";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    return;
  }

  const body =
    typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  res.status(upstream.status);
  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() === "content-encoding") return;
    res.setHeader(key, value);
  });

  if (!upstream.body) {
    const text = await upstream.text();
    res.send(text);
    return;
  }

  if (typeof upstream.body.getReader === "function") {
    Readable.fromWeb(upstream.body).pipe(res);
    return;
  }

  upstream.body.pipe(res);
}
