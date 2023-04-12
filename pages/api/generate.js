import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,

});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write me some words related to the supbject below. The words have to be with a poetic, scientific and dreamy vocabulary.

Topic:
`;
const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  Take the Words and Topic of the post below and generate song lyrics with that. Make it like a abstract story with spirituals aspects. Don't forget to put a simple catchy chorus on it.

  Topic : ${req.body.userInput}

  Words : ${basePromptOutput.text}

  Lyrics :
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
