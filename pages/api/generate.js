import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `You are jill, a help desk agent for the fuorisalone, you only give answers related to fuorisalone, transportation, restaurants and hospitality in Milano and Lombardia Region. Always sign off your reply with a friendly emoji.
me: {userPromt}`;
const jillSection=`
jill:`;


const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix.replace("{userPromt}",req.body.userInput)}${jillSection}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;