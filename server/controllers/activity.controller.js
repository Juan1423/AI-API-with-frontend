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

  switch (tipo.toLowerCase()) {
    case "cuento":
      return `Genera una historia corta con 5 oraciones. Está dirigida a un niño de ${edad} años con Síndrome de Down. El tema es: ${tema}. ${complejidad}`;

    case "juego":
      return `Crea un juego de palabras para un niño de ${edad} años con Síndrome de Down. El juego debe incluir 5 palabras relacionadas con el tema: ${tema}. ${complejidad}`;

    case "repetición":
      return `Diseña una actividad de repetición de palabras para un niño de ${edad} años con Síndrome de Down. Usa palabras concretas y frases cortas. ${complejidad}`;

    case "diálogo":
      return `Escribe un mini-diálogo entre un niño y un personaje (puede ser un ${tema}), usando frases simples y repetitivas. 
      Dirigido a un niño de ${edad} años con Síndrome de Down. ${complejidad}`;

    case "rutina":
      return `Crea una historia con 4 frases sobre la rutina diaria de un niño, pensada para un niño con Síndrome de Down de ${edad} años. 
      El tema puede incluir: ${tema}. ${complejidad}`;

    case "emociones":
      return `Genera una actividad para enseñar 3 emociones básicas (feliz, triste, enojado) a un niño con Síndrome de Down de ${edad} años. ${complejidad}`;

    default:
      return `Genera una actividad de lenguaje simple para un niño de ${edad} años con Síndrome de Down. El tema es: ${tema}, el tipo es: ${tipo}, y el nivel es: ${nivel}. ${complejidad}`;
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