import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `write a detailed resume and use technical words. Include prompts if given.

Resume:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.58,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = 
  `
  take the resume below and make it into an applicant tracking software compatible resume:
  prompt: ${req.body.userInput}
  Resume: ${basePromptOutput.text}
  Applicant tracking software compatible resume:
  `
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.65,
		// I also increase max_tokens.
    max_tokens: 1250,
  });

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  const thirdPrompt = 
  `
  take the applicant tracking software compatible resume below and check for spelling mistakes and add these parameters to the new resume:
  prompt: ${req.body.userInput}
  Resume: ${secondPromptOutput.text}
  Applicant tracking software compatible resume:
  `
  const thirdPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${thirdPrompt}`,
    temperature: 0.58,
		// I also increase max_tokens.
    max_tokens: 1200,
  });

  const thirdPromptOutput = thirdPromptCompletion.data.choices.pop();

  res.status(200).json({ output: thirdPromptOutput });
};

export default generateAction;