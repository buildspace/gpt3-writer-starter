import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "write a poem in the style Rumi about ";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 200,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;