import { Configuration, OpenAIApi } from "openai";
console.log(process.env.OpenAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OpenAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  // Generate the title
  const titleCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Please write a title for a fanfiction story set in the Harry Potter Universe with an original character or characters. Make it awesome like something JK Rowling would write.`,
    temperature: 0.8,
    max_tokens: 50,
  });
  const title = titleCompletion.data.choices.pop().text;

  // Generate the opening paragraph
  const basePrompt = 
  `
  Please write a fanfiction story set in the Harry Potter Universe with an original character or characters for the title below. Please make sure that the response outputs an opening paragraph in a style like JK Rowling. Make it awesome.
  
  Title: ${title}
  `;
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: basePrompt,
    temperature: 0.8,
    max_tokens: 250,
  });
  const openingParagraph = baseCompletion.data.choices.pop().text;

  // Generate the plot point
  const secondPrompt = 
  `
  Continue this fanfiction story set in the Harry Potter Universe with an original character that accepts a plot point that takes it in a new direction but still keeps it cohesive. Make it awesome like something JK Rowling would write. 

  Title: ${title}
  
  Opening Paragraph: ${openingParagraph}
  
  Plot Point: 
  `;
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: secondPrompt,
    temperature: 0.85,
    max_tokens: 1250,
  });
  const plotPoint = secondPromptCompletion.data.choices.pop().text;

  res.status(200).json({ title, openingParagraph, plotPoint });
};

export default generateAction;
