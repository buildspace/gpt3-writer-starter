import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Write a recipe based on the type delivery food for two people.

The recipe should be structured like this, but it should not be written as a numbered list

1. Interesting recipe title
2. Quick introduction on the recipe why its great
3. The key thing to consider when cooking the recipe
4. Ingredients list
5  What kind of alternative generic ingredients they can use when not at home available,  explain what is key about the alternative and offer vegan alternatives
6. Step by step cooking instructions as a numbered list

Recipe:`;

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1500,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondbasePrompt = `Take the recipe make it sound like David Chang wrote it and it can be cooked within 30mins at home

  Recipe:${basePromptOutput.text}

  Recipe:
  `;

  const secondPromptCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${secondbasePrompt}`,
    temperature: 0.7,
    max_tokens: 1500,
  });

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
