import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Explain ";
const basePromptSuffix = " like I am 5. Make it fun and concise.";
const generateAction = async (req, res) => {

    let topic = req.body.userInput
    if(!topic){
        topic = "Quantum Mechanics";
    }

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${topic}${basePromptSuffix}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;