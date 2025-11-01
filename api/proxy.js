export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const result = await fetch("https://script.google.com/macros/s/AKfycbxCKTPwsPcJybc2xF0_BV1ojVqMIiptBVHaB2Q5IpGsBrW7SqMbdAT--JIvXrcFjiA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await result.text();
      res.status(200).send(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Proxy error", details: err.toString() });
    }
  } else {
    res.status(405).end();
  }
}
