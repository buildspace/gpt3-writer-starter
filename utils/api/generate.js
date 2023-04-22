import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// TODO:
// always try to recommend that a positive possibility. "maybe this could happen."
// uphold the value of radical optimism

// const choosePromptPrefix = () => {
//   let prefix = '';
//   if (highlightChoice === 'negative') {
//     prefix = `In your answer, please do not include ${highlightedText}, because ${reasonForHighlight}`;
//   } else {
//     prefix = `If possible and relevant, include ${highlightedText} in your answer, because ${reasonForHighlight}`;
//   }
//   return prefix;
// };

export const generate = async (promptPrefix, conversation) => {
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${promptPrefix}${conversation}\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  const basePromptOutput = baseCompletion.data.choices.pop();
  // todo: remove these logs
  console.log("OPENAI API PROMPT:", `${promptPrefix}${conversation}`);
  console.log("OPENAI API RESPONSE:", basePromptOutput.text);
  return basePromptOutput;
};