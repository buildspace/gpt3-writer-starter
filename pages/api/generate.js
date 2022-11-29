import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
write a list of 5 multiple choice questions with one correct answer each about the next text, write the correct choices below all the questions in a separate part:
`;
const basePromptSuffix =
`
first, the questions:
`;
const generateAction = async (req, res) => {
    // asd
    console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptSuffix}\n`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}\n`,
        temperature: 0.9,
        max_tokens: 1000,
    });
    const basePromptOutput  = baseCompletion.data.choices.pop();

    res.status(200).json({output: basePromptOutput});
};

export default generateAction;