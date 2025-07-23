const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient();

exports.synthesizeSpeech = async (req, res) => {
  const { text } = req.body;
  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  const filePath = "output.mp3";
  await writeFile(filePath, response.audioContent, "binary");
  res.sendFile(filePath, { root: "." });
};