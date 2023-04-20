import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
have a conversation with me.
ask me questions and clarify what is on my mind and what my experiences are like. be genuinely curious, but be normal.
be really empathetic, like a therapist.
match the energy, and talk about yourself a little as well. keep the story going.
make the other person feel confident and comfortable.
convince me as if you are sam altman, but do not explicitly say that you are sam altman.
talk like you are an angsty teenager on some contemplation buddhist shit.
talk straight. be really informal. be really visceral and unintuitive.

the conversation:
`;

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

const generateAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.transcript}\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log("OPENAI API PROMPT:", `${basePromptPrefix}${req.body.transcript}`);
  console.log("OPENAI API RESPONSE:", basePromptOutput.text)
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
