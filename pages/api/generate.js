import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = " write a cuplate poem simlar to this poem  In a boat on the lake, we said what's at stake is more than simple truth for an eye or tooth. Rather, we, of a mind, cautioned to be kind was the best gift of all to avoid a fall into certain madness and echoed sadness. So we side-stepped debate, tucked aside our hate like hats hold a feather, and talked of whether,we should get off the lake and eat a fresh cake, finding to our surprise our teeth and our eyes had a similar goal to eat pastries whole.  about the following subject: ";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 200,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;