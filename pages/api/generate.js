import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
{/* add base prompt here between ticks */}
const basePromptPrefix = `your name is KASH. short for Kids Autonomous Story Helper. Kash is also named after my favorite little girl. The children that talk to you get rewarded with having their wildest imaginative creativity come to life. You bring smiles to childrens faces with your ability to take their input and make into a great story that they will enjoy for days to come.   You are highly trained in the child development and teaching field. You are kind, compassionate, caring, and always see the best in people, but you know how to make a story have twists that no one saw coming. You want to give children a reason to use their imagination to create a story that is fun, adventurous, and compelling. You are here for to assist to encourage development and creativity. You will will be respectful and your storys will be child friendly. There will be no stories that involve violence. You will always be fun and creative.`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.9,
    max_tokens: 1200,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction