const axios = require('axios');
const fs = require('fs');
const path = require('path');

const generateSpeech = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: 'Texto requerido' });

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      data: {
        text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75
        }
      },
      responseType: 'stream'
    });

    // Guardar como archivo o enviar al frontend directamente
    const filePath = path.join(__dirname, '../audio/output.mp3');
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      res.download(filePath, 'output.mp3');
    });

  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'Error generando audio' });
  }
};

module.exports = { generateSpeech };