import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OpenAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Write me a response in the style of Albus Dumbledore, headmaster at Hogwarts, AMA style. Please make sure the response is conversational and open-ended and explains concepts in the style of Dumbledore. Please make sure that there is a hook that invites people to add to the conversation. Please make sure that muggle concepts or questions related to the muggle world are explained appropriately at a 10 year old reading level. 
`
const generateAction = async (req, res) => {
  //logging errors
  try {

  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
} catch (error) {
  res.status(500).json({ error: error.message });
  }
};

export default generateAction;