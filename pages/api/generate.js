// Imports the Configuration and OpenAIApi classes from the openai library
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});

// Creates an OpenAIApi instance using the Configuration instance
const openai = new OpenAIApi(configuration);

// Define the prefix for the API prompt
const basePromptPrefix = "";

// Define the generateAction function
const generateAction = async (req, res) => {
  // Log the API request
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  // Call the OpenAI API to generate a response to the prompt
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  // Get the response from the API call
  const basePromptOutput = baseCompletion.data.choices.pop();

  // Return the response to the client
  res.status(200).json({ output: basePromptOutput });
};

// Export the generateAction function
export default generateAction;
