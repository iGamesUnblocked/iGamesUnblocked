import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const API_KEY = "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";

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 150
      })
    });
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
