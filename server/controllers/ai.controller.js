const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateStory = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "El campo 'prompt' es obligatorio." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150, // Limita la respuesta para ahorrar uso
      temperature: 0.7,
    });

    const story = completion.choices[0].message.content;
    res.status(200).json({ story });
  } catch (error) {
    console.error("Error al generar historia con OpenAI:", error);
    res.status(500).json({ error: "Ocurrió un error al generar la historia." });
  }
};
