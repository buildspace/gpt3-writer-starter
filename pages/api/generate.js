import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
Give me advice in the style of Plato, remember to reference all of his writings to make sure that the advice is as similar to his writings as possible and use first person as if Plato himself is replying. Keep the tone wise and encouraging.

Question:`;
const basePromptSuffix = `
Answer:`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptSuffix}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}`,
    temperature: 0.9,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;