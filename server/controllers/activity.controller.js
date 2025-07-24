const Activity = require("../models/activity");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function construirPrompt({ tipo, tema, edad, nivel }) {
  let complejidad;

  switch (nivel.toLowerCase()) {
    case "básico":
      complejidad = "Usa frases muy simples, vocabulario básico y sílabas directas. Evita palabras largas o complejas.";
      break;
    case "intermedio":
      complejidad = "Usa frases simples con un poco más de variedad en el vocabulario. Puedes incluir algunas palabras con sílabas mixtas.";
      break;
    case "avanzado":
      complejidad = "Usa frases más elaboradas, introduce vocabulario nuevo y permite algunas estructuras más complejas, manteniendo claridad.";
      break;
    default:
      complejidad = "Usa frases simples y vocabulario claro.";
  }

  const formatoBase = "Responde SOLO con el contenido solicitado, sin introducciones, saludos o explicaciones adicionales. NO uses markdown, asteriscos, guiones o cualquier formato especial. Usa solo texto plano.";

  switch (tipo.toLowerCase()) {
    case "cuento":
      return `${formatoBase} Escribe una historia corta con exactamente 5 oraciones para un niño de ${edad} años con Síndrome de Down. Tema: ${tema}. ${complejidad}`;

    case "juego":
      return `${formatoBase} Presenta un juego de palabras con exactamente 5 palabras relacionadas con ${tema} para un niño de ${edad} años con Síndrome de Down. Lista solo las palabras numeradas del 1 al 5, sin instrucciones adicionales. ${complejidad}`;

    case "repetición":
      return `${formatoBase} Crea una lista de 5 palabras o frases cortas sobre ${tema} para repetir, dirigida a un niño de ${edad} años con Síndrome de Down. Presenta solo la lista numerada. ${complejidad}`;

    case "diálogo":
      return `${formatoBase} Escribe un diálogo corto entre un niño y un personaje relacionado con ${tema}. Máximo 6 intercambios (3 de cada uno). Para un niño de ${edad} años con Síndrome de Down. Formato: Niño: [texto] / Personaje: [texto]. ${complejidad}`;

    case "rutina":
      return `${formatoBase} Describe una rutina diaria en exactamente 4 frases simples relacionadas con ${tema}, para un niño de ${edad} años con Síndrome de Down. ${complejidad}`;

    case "emociones":
      return `${formatoBase} Lista 3 emociones básicas (feliz, triste, enojado) con una frase simple para cada una, dirigido a un niño de ${edad} años con Síndrome de Down. Formato: [Emoción]: [frase]. ${complejidad}`;

    default:
      return `${formatoBase} Crea una actividad de lenguaje sobre ${tema} para un niño de ${edad} años con Síndrome de Down. Tipo: ${tipo}. ${complejidad}`;
  }
}



exports.createActivity = async (req, res) => {
  try {
    const { child, tipo, tema, edad, nivel } = req.body;

    const prompt = construirPrompt({ tipo, tema, edad, nivel });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const textoGenerado = completion.choices[0].message.content;

    // Guarda la actividad con el texto generado
    const nuevaActividad = await Activity.create({
      childId: child,
      tipo,
      tema,
      edad,
      nivel,
      contenido: textoGenerado,
    });

    res.status(201).json(nuevaActividad);
  } catch (error) {
    console.error("Error al generar actividad:", error);
    res.status(500).json({ error: "Error generando actividad" });
  }
};

exports.getActivities = async (req, res) => {
  const { childId } = req.params;
  const activities = await Activity.find({ childId });
  res.json(activities);
};