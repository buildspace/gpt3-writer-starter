import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptSuffix = 'generate a one very short line summary for this statement. exaggerate. don\'t forget to match the energy.';

const generateAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptSuffix}: "${req.body.userInput}"\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  const basePromptOutput = baseCompletion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
