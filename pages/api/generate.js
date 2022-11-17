import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: req.body.input,
    temperature: 0.7,
  });

  const choice = completion.data.choices.pop();
  res.status(200).json({ choice });
};

export default generateAction;
