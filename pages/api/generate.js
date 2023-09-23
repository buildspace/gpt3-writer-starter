import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write me a blog post in the style of Paul Graham with the title below. Please make sure the blog post goes in-depth on the topic and shows that the writer did their research.

Title:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

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
/*
Explanation:

First, we’re using the createCompletion endpoint which you can check out here.https://beta.openai.com/docs/api-reference/completions/create?utm_source=buildspace.so&utm_medium=buildspace_project

It has a lot of options.
The 4 most important things we need to give it is:

model — Which is the model type we want to use.
        As of today, text-davinci-003 is the most advanced model.
        You can explore other models here. https://beta.openai.com/docs/models/gpt-3?utm_source=buildspace.so&utm_medium=buildspace_project

prompt — This is the prompt we’re passing, just like we’d do in Playground.
         In this case, we pass it basePromptPrefix which is an empty string right now (we’ll use it later)
         and req.body.userInput which will be the input that the user enters in the textarea
         on the frontend that we send to this API function.

temperature — We already know about this thing from Playground.
              You can play with it more later based on your use case.

max_tokens — I’m setting this to 250 for now which is about 1,000 characters total.
             If you’re dealing with longer prompts + longer outputs, you can increase this number later.
             But for testing purposes better to keep it lower.
             I’ll definitely increase this later because I want longer blog posts generated for myself.

*/
