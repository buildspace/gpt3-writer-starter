import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-rPcAa7qnJV1z2NJv1JcytkqS",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const basePromptPrefix =
`
write a detailed fashion collection statement about the design concept below
design concept:
`
const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  Take the contents and design concept of the statement below and generate a longer new statement in 4 paragraph written in the style of Nobel Literature Price winner. Make it feel like a story, allow people feel more exciting and deeply touched. 

  design concept: ${req.body.userInput}

  statement: ${basePromptOutput.text}

  new statement:
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1500,
  });

  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;


