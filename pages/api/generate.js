import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

import { CallbackHandler } from "langfuse-langchain";


const promptTemplate = `Du bist ein Assistent bei der Studiengangfindung für Schüler. 
  Antworte bitte in Stichpunkten und bleibe bei Du. 
  Basierend auf den Antworten unten, generiere eine Empfehlung für passende Studiengänge und Berufsfelder. 
  Antworte Präzise und empfehle 2 Studiengänge pro Interessensbereich.
  Nenne danach 2 mögliche Berufsfelder pro Studiengang.\n
  \n
  Frage 1:  Welche Fächer begeistern dich in der Schule am meisten?\n 
  Antwort 1: {answer_1}\n
  Frage 2:  Welche Bereiche findest du spannend? (z.B. Medizin, Wirtschaft, Technik, etc.)?\n
  Antwort 2: {answer_2}\n
  Frage 3:  Wie wichtig ist es dir, dass du nach deinem Studium viele unterschiedliche Berufsmöglichkeiten hast? Oder würdest du lieber ein Studium machen, das dich auf einen bestimmten Beruf vorbereitet?\n
  Antwort 3: {answer_3}\n`;


const generateAction = async (req, res) => {
  const answers = req.body.userInput;

  console.log(`user answers: ${answers}`);
  console.log(`promptTemplate: ${promptTemplate}`);

  // create a handler
  // const langfuseHandler = new CallbackHandler({
  //   publicKey: process.env.LF_PUBLIC_KEY,
  //   secretKey: process.env.LF_SECRET_KEY,
  // });

  // create a model
  const model = new OpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4"
  });
  // create a prompt
  const prompt = PromptTemplate.fromTemplate(promptTemplate);
  // create a chain
  const chain = new LLMChain({
    llm: model,
    prompt,
    // callbacks: [langfuseHandler],
  });

  // execute the chain
  const result = await chain.call(
    { answer_1: answers[0], answer_2: answers[1], answer_3: answers[2] },
    // { callbacks: [langfuseHandler] }
  );

  console.log(`raw result: ${result}`)

  const resultText = result["text"];

  console.log(`result: ${resultText}`);

  res.status(200).json({ output: resultText });

};

export default generateAction;