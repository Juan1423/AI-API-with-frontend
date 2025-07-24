const axios = require("axios");

const generateSpeech = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texto requerido" });
  }

  try {
    const response = await axios({
      method: "POST",
      url: "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      data: {
        text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      },
      responseType: "stream",
    });

    // Establecer encabezados para reproducir directamente
    res.setHeader("Content-Type", "audio/mpeg");

    // Enviar el stream al frontend sin guardar archivo
    response.data.pipe(res);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Error generando audio" });
  }
};

module.exports = { generateSpeech };
