import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const basePromptPrefix = "Antworte bitte in Stichpunkten und bleibe bei Du. Basierend auf diesen Antworten, bitte generiere eine Empfehlung für passende Studiengänge und Berufsfelder. Antworte Präzise und empfehle 2 Studiengänge pro Interessensbereich. Nenne danach 2 mögliche Berufsfelder pro Studiengang. ";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)


const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: req.body.userInput }],
    model: "gpt-4",
});

console.log(chatCompletion.choices[0].message);
  
  
const basePromptOutput = chatCompletion.choices[0].message.content;

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;