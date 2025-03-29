import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const { claim } = req.body;

    const chat = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "אתה בודק עובדות. ענה רק אמת מבוססת." },
        { role: "user", content: claim }
      ],
      model: "gpt-3.5-turbo"
    });

    const result = chat.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error verifying claim:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}