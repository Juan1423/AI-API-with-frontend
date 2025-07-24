import api from "./api";

export const generateSpeech = async (text) => {
  const response = await api.post("/tts/tts", { text}, { responseType: "blob" });
  return response;
};
