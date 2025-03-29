import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const { claim } = req.body;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "אתה בודק פייק ניוז. קבל טענה בעברית וענה האם היא נכונה, מטעה או שקרית, כולל נימוק קצר ומקור אם יש.",
                },
                {
                    role: "user",
                    content: claim,
                },
            ],
        });

        const result = completion.data.choices[0].message.content;
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: "Failed to verify claim." });
    }
}
