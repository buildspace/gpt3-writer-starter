import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); 

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Write me a workout plan to:

Take what the user requested and write a detailed explanation of why the workout plan is best for their body.
The workout plan should include what muscles the user should train 
as well as what they should eat after each day. Dig into the science behind the nutirtion


Workout plan:`; 

const generateAction = async (req, res) => {

    // baseprompt + user prompt = final output
    console.log(`API: ${basePromptPrefix}${req.body.userInput} /n `)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.8,
        max_tokens: 3000,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;







// the model, which the type of do we want to use? For example "text-davinvi-003" is the most advaned model
// prompt, this prompt we're passing, just what anyone user would do in the playground. We pass it a basePromptPrefix (which is an empty string as if right now)
// req.body.userInput is the input that that the user will input in the textArea on the frontEnd that we send to this API function 
// temperature just determines how accurate u want GPT-3 you want it to be
// max-tokens: 250 tokens can be 1,000 characters total. 